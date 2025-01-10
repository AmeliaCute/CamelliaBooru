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


export default function ExploreScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewablePost, setViewablePost] = useState(new Set<string>());
  const flatListRef = useRef<FlatList<Content>>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('tabPress' as any, () => {
        scrollToTop();
      });

      return unsubscribe;
    }, [navigation])
  );

  const fetchPosts = async (query: string) => {
    if(isLoading) return;
    setIsLoading(true);
    try {
      const server = Globals.currentServer;
      if (server) {
        const fetchedPosts = await server.gelbooru_searchPosts(query, 5);
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

      // Pause all videos except the one that is currently in view
      if (viewableItems.length > 0) {
        const firstVisibleItem = viewableItems[0].item as Content;
        if (firstVisibleItem.id !== playingVideoId) {
          setPlayingVideoId(firstVisibleItem.id);
        }
      }
    },
    [playingVideoId]
  );

  const handleSearch = (query: string) => {
    setQuery(query);
    ResetPostData();
  };


  return (
    <ThemedView style={{backgroundColor: "#A670DCFF"}}>
      <FlatList
        ref={flatListRef}
        data={posts}

        renderItem={({ item }) => <Post post={item} isInView={viewablePost.has(item.id)} />}
        keyExtractor={(item) => `${item.id}-${item.curl}`}

        onEndReached={() => fetchPosts(query)}
        onEndReachedThreshold={0.8}

        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}

        ListHeaderComponent={<Explore_Header onServerChange={handleServerChange} onSearch={handleSearch}/>}
        ListEmptyComponent={isLoading ? <ThemedText>Loading...</ThemedText> : <ThemedText>No posts available</ThemedText>}

        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});