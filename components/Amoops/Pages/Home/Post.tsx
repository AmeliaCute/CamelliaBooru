import { ThemedView } from "@/components/ThemedView";
import { Content } from "@/modules/Content";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { PostMedia } from "./PostMedia";

export type PostProps = {
    post: Content
    isInView: boolean
};

export const Post = memo(function Post({ post, isInView }: PostProps) {
    return (
        <ThemedView style={styles.Container}>
            <PostMedia post={post} isInView={isInView} />
        </ThemedView>
    );
});

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});