import { Image, StyleSheet, Platform, View, FlatList, ViewToken, ListRenderItemInfo } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { Home_Header } from '@/components/Amoops/Pages/Home/Header';
import { useCallback, useEffect, useRef, useState} from 'react';
import Globals from '@/constants/Globals';
import { Content } from '@/modules/Content';
import { Post } from '@/components/Amoops/Pages/Home/Post';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Server } from '@/modules/Server';
import { observer } from 'mobx-react';

const ObservedHomeHeader = observer(Home_Header);

export default function HomeScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewablePost, setViewablePost] = useState(new Set<string>());
  const flatListRef = useRef<FlatList<Content>>(null);
  
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('tabPress' as any, () => {
        scrollToTop();
      });

      return unsubscribe;
    }, [navigation])
  );

  const fetchPosts = async () => {
    if(isLoading) return;
    
    setIsLoading(true);
    try {
      const server = Globals.currentServer;
      if (server) {
        const fetchedPosts = await server.gelbooru_getLatestsPosts(5);
        setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  function ResetPostData() {
    setPosts([]);
  }

  const handleServerChange = useCallback((newServer: Server) => {
    if (Globals.currentServer !== newServer) {
      Globals.currentServer = newServer;
      ResetPostData();
    }
  }, []);
 

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visibleItemIds = new Set(viewableItems.map((item) => (item.item as Content).id));
      setViewablePost(visibleItemIds);
    },
    []
  );

  return (
    <ThemedView style={{backgroundColor: "#A670DCFF"}}>
      <FlatList
        ref={flatListRef}
        data={posts}

        renderItem={({ item }) => <Post post={item} isInView={viewablePost.has(item.id)} />}
        keyExtractor={(item) => `${item.id}-${item.curl}`}

        onEndReached={fetchPosts}
        onEndReachedThreshold={0.8}

        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}

        ListHeaderComponent={<ObservedHomeHeader onServerChange={handleServerChange}/>}
        ListEmptyComponent={isLoading ? <ThemedText>Loading...</ThemedText> : <ThemedText>No posts available</ThemedText>}

        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}


