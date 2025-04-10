import { observer } from 'mobx-react';
import { Explore_Header } from '@/components/Amoops/Pages/Explore/Header';
import Globals from '@/constants/Globals';
import { PostListScreen } from '@/components/Amoops/Pages/Common/PostListScreen';
import { Server } from '@/modules/Server';
import { useState } from 'react';

const ObservedExploreHeader = observer(Explore_Header);

export default function ExploreScreen() {
  const [currentQuery, setCurrentQuery] = useState('');

  const fetchPosts = async (query?: string, force = false) => {
    const server = Globals.currentServer;
    if (!server) return [];

    if (!query || currentQuery == '')  return await server.gelbooru20_getLatestsPosts(5);;
    
    return await server.gelbooru20_searchPosts(currentQuery, 5);
  };

  const handleSearch = async (newQuery: string) => {
    setCurrentQuery(newQuery);
    Globals.currentServer.gelbooru_explore_offset = 0;
  };

  return (
    <PostListScreen
      fetchPosts={fetchPosts}
      onSearch={handleSearch}
      renderHeader={({ handleServerChange, onSearch }) => (
        <ObservedExploreHeader onServerChange={handleServerChange} onSearch={onSearch} />
      )}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
        minimumViewTime: 300,
        waitForInteraction: true,
      }}
    />
  );
}
