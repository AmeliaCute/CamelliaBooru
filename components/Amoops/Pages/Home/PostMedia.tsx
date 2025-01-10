import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Content } from "@/modules/Content";
import { ResizeMode, Video } from "expo-av";
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { useFocusEffect } from '@react-navigation/native';

export type PostMediaProps = {
  post: Content;
  isInView: boolean;
};

export const PostMedia = memo(function PostMedia({ post, isInView }: PostMediaProps) {
  const screenWidth = Dimensions.get('window').width;
  const mediaHeight = (post.width ? (post.height / post.width) * screenWidth : screenWidth) * .815;
  const [isVisible, setIsVisible] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(isInView);
  const mediaRef = useRef<View>(null);

  useFocusEffect(
    useCallback(() => {
      setShouldPlay(isInView);
      return () => setShouldPlay(false);
    }, [isInView])
  );

  useEffect(() => {
    const checkVisibility = () => {
      if (mediaRef.current) {
        mediaRef.current.measure((x, y, width, height, pageX, pageY) => {
          const windowHeight = Dimensions.get("window").height;
          const distanceFromTop = pageY;
          const distanceFromBottom = pageY + height;
          const isVisible = distanceFromTop < windowHeight + 1000 && distanceFromBottom > -1000;
          setIsVisible(isVisible);
        });
      }
    };

    checkVisibility();
    const intervalId = setInterval(checkVisibility, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TouchableWithoutFeedback>
      <View ref={mediaRef}>
        {post.type === 'image' ? (
          <Image
            source={{ uri: post.curl }}
            style={[styles.feedMedia, { height: mediaHeight }]}
            cachePolicy="memory-disk"
            contentFit="cover"
            onError={() => (
              <Image
                source={{ uri: post.curl }}
                style={[styles.feedMedia, { height: mediaHeight }]}
                contentFit="cover"
              />
            )}
          />
        ) : isVisible ? (
          <Video
            source={{ uri: post.curl }}
            style={[styles.feedMedia, { height: mediaHeight }]}
            resizeMode={ResizeMode.COVER}
            isMuted={false}
            isLooping
            shouldPlay={shouldPlay}
            useNativeControls
            usePoster
          />
        ) : (
          <ThemedView style={[styles.feedMedia, { height: mediaHeight }]}>
            <ThemedText style={{ textAlign: "center" }}>Video wasn't not visible</ThemedText>
            <ThemedText style={{ textAlign: "center" }}>Wait for it to reload</ThemedText>
          </ThemedView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  feedMedia: {
    backgroundColor: "#000",
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#828282FF",
  },
});