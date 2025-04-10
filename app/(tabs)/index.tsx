import { observer } from 'mobx-react';
import { Home_Header } from '@/components/Amoops/Pages/Home/Header';
import Globals from '@/constants/Globals';
import { PostListScreen } from '@/components/Amoops/Pages/Common/PostListScreen';
import { Server } from '@/modules/Server';

const ObservedHomeHeader = observer(Home_Header);

export default function HomeScreen() {
  const fetchPosts = async () => {
    const server = Globals.currentServer;
    if (!server) return;
    
    const fetchedPosts = await server.gelbooru20_getLatestsPosts(5);
    return fetchedPosts;
  };

  return (
    <PostListScreen
      fetchPosts={fetchPosts}
      renderHeader={({ handleServerChange }) => (
        <ObservedHomeHeader onServerChange={handleServerChange} />
      )}
    />
  );
}
