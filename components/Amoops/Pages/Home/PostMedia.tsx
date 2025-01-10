import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Content } from "@/modules/Content";
import { ResizeMode, Video } from "expo-av";
import { memo, useEffect, useRef, useState } from 'react'
import { Dimensions, View, StyleSheet, Image } from "react-native";

export type PostMediaProps = {
    post: Content
    isInView: boolean
};

export const PostMedia = memo(function PostMedia({ post, isInView }: PostMediaProps) {
    const mediaHeight = post.width ? (post.height / post.width) * 300 : 300;
    const [isVisible, setIsVisible] = useState(isInView);
    const mediaRef = useRef<View>(null);

    useEffect(() => {
        const checkVisibility = () => {
            if (mediaRef.current) {
            mediaRef.current.measure((x, y, width, height, pageX, pageY) => {
                const windowHeight = Dimensions.get("window").height;
                const distanceFromTop = pageY;
                const distanceFromBottom = pageY + height;
                const isVisible = distanceFromTop < windowHeight + 2000 && distanceFromBottom > -1000;
                setIsVisible(isVisible);
            });
            }
        };

        checkVisibility();
        const intervalId = setInterval(checkVisibility, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View ref={mediaRef}>
            {post.type === 'image' ? (
                <Image
                   source={{ uri: post.curl }}
                   style={[styles.feedMedia, {height: mediaHeight}]}
                />
            
            /* If content is visible and is a video */
            ) : isVisible ? (
                <Video 
                    source={{ uri: post.curl }}
                    style={[styles.feedMedia, {height: mediaHeight}]}

                    resizeMode={ResizeMode.COVER}
                    isMuted={false}
                    isLooping
                    shouldPlay={isInView}
                    useNativeControls
                    usePoster
                />
            /* Mean that content is not visible ( DO NOT REMOVE OR UR PHONE WILL CRASH )*/
            ) : (
                <ThemedView style={[styles.feedMedia, { height: mediaHeight }]}>
                    <ThemedText style={{ textAlign: "center" }}>Video wasn't not visible</ThemedText>
                    <ThemedText style={{ textAlign: "center" }}>Wait for it to reload</ThemedText>
                </ThemedView>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    feedMedia: {
        backgroundColor: "#000",
        width: "100%",

        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#82828263"
    },
});