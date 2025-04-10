import { ThemedView } from "@/components/ThemedView";
import Globals from "@/constants/Globals";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Content } from "@/modules/Content";
import { Server } from "@/modules/Server";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Post } from "../Home/Post";
import { HeaderAlertWidget } from '@/components/Amoops/Widget/HeaderAlertWidget';

type HeaderRendererProps = 
{
    handleServerChange: (newServer: Server) => void;
    onSearch?: (query: string) => void;
}

type Props = 
{
    fetchPosts: (query?: string, force?: boolean) => Promise<Content[] | undefined>;
    renderHeader: (props: HeaderRendererProps) => JSX.Element;
    withQuery?: boolean;
    viewabilityConfig?: any;
    onSearch?: (query: string) => void;
}

export function PostListScreen(
    {
        fetchPosts,
        renderHeader,
        withQuery = false,
        viewabilityConfig = { viewAreaCoveragePercentThreshold: 60},
        onSearch
    }: Props)
{
    const navigation   = useNavigation();
    const router       = useRouter();
    const flatListRef  = useRef<FlatList<Content>>(null);

    const [posts, setPosts] = useState<Content[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewablePost, setViewablePost] = useState(new Set<string>());

    const backgroundColor = useThemeColor({}, 'headerBackground');

    const scrollToTop =()=> flatListRef.current?.scrollToOffset({offset: 0, animated: true});
    const resetPosts  =()=> setPosts([]);

    useFocusEffect(
        useCallback(() => 
        {
            return navigation.addListener('tabPress' as any, scrollToTop)
        }, [navigation])
    );

    const handleViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[]}) => 
        {
            setViewablePost(new Set(viewableItems.map(item => (item.item as Content).id)));   
        },
        []
    );
    
    const handleServerChange = useCallback((newServer: Server) => 
    {
        if(Globals.currentServer === newServer) return;
        
        Globals.currentServer = newServer;
        resetPosts();
    },  []);

    return (
        <ThemedView style={{backgroundColor}}>
            <FlatList
                ref={flatListRef}
                data={posts}
                renderItem={({item}) => <Post post={item} isInView={viewablePost.has(item.id)}/>}
                keyExtractor={(item) => `${item.id}-${item.curl}`}

                onEndReached={async () => {
                    const fetched = await fetchPosts();
                    if (fetched) setPosts(prev => [...prev, ...fetched]);
                }}

                onEndReachedThreshold={.8}

                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={renderHeader({handleServerChange, onSearch})}
                ListEmptyComponent={
                    isLoading 
                    ? (<HeaderAlertWidget icon="magnifyingglass" info="Loading.." />) 
                    : (<HeaderAlertWidget icon="xmark.circle" info="No posts available" />)
                }
            />
        </ThemedView>
    );
}