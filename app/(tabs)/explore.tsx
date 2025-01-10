import { Image, StyleSheet, Platform, View, FlatList, ViewToken, ListRenderItemInfo } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useRef, useState} from 'react';
import Globals from '@/constants/Globals';
import { Content } from '@/modules/Content';
import { Post } from '@/components/Amoops/Pages/Home/Post';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Server } from '@/modules/Server';
import { Explore_Header } from '@/components/Amoops/Pages/Explore/Header';
import { observer } from 'mobx-react';

const ObservedExploreHeader = observer(Explore_Header);


export default function ExploreScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewablePost, setViewablePost] = useState(new Set<string>());
  const flatListRef = useRef<FlatList<Content>>(null);
  const [query, setQuery] = useState('');
  
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('tabPress' as any, () => {
        scrollToTop();
      });

      return unsubscribe;
    }, [navigation])
  );

  const fetchPosts = async (query: string, force = false) => {
    if(isLoading && !force) return;
    setIsLoading(true);
    try {
      const server = Globals.currentServer;
      if (server) {
        console.log("Query: ", query);
        const fetchedPosts = await server.gelbooru_searchPosts(query, 5);
        if(fetchedPosts === undefined) return;

        setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
      }
    } catch (error) {
      console.error('AAAAA Failed to fetch posts:', error);
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

  const handleSearch = async (nquery: string) => {
    Globals.currentServer.gelbooru_explore_offset = 0;
    setQuery(nquery);
    setIsLoading(true);

    ResetPostData();
    await fetchPosts(nquery, true);

    setIsLoading(false);
  };


  return (
    <ThemedView style={{backgroundColor: "#A670DCFF"}}>
      <FlatList
      ref={flatListRef}
      data={posts}

      renderItem={({ item }) => <Post post={item} isInView={viewablePost.has(item.id)} />}
      keyExtractor={(item) => `${item.id}-${item.curl}`}

      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
        minimumViewTime: 300,
        waitForInteraction: true,
      }}

      onEndReached={() => {fetchPosts(query)}}
      onEndReachedThreshold={0.8}

      onViewableItemsChanged={({ viewableItems, changed }) => {
        const centerIndex = Math.floor(viewableItems.length / 2);
        const centerItem = viewableItems[centerIndex];
        if (centerItem) {
        setViewablePost(new Set([centerItem.item.id]));
        }
      }}
      ListHeaderComponent={() => <ObservedExploreHeader onServerChange={handleServerChange} onSearch={handleSearch} />}

      ListEmptyComponent={isLoading ? <ThemedText>Loading...</ThemedText> : <ThemedText>No posts available</ThemedText>}

      showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}