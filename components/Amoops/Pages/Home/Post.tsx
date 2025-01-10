import { ThemedView } from "@/components/ThemedView";
import { Content } from "@/modules/Content";
import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { PostMedia } from "./PostMedia";
import { DebugWidget } from "../../Widget/DebugWidget";

export type PostProps = {
    post: Content
    isInView: boolean
};

export const Post = memo(function Post({ post, isInView }: PostProps) {
    return (
        <TouchableWithoutFeedback>
            <ThemedView style={styles.Container}>
                <PostMedia post={post} isInView={isInView} />
                {/* Additional post content LIKE DEBUG */}
                <DebugWidget data={
                    post.date + ": " + post.id
                }/>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        padding: 30,
        gap: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});