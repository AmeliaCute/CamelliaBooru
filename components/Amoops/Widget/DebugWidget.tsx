import { ThemedView } from "@/components/ThemedView";
import { Content } from "@/modules/Content";
import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text} from "react-native";

export type PostProps = {
    data: string | any;
};

export const DebugWidget = memo(function Post({ data }: PostProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Debuging widget </Text>
            {
                typeof data === 'string' ? (<Text style={styles.text}>{data}</Text>)
                : data
            }
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#A9EBB6FF",
        borderWidth: 1,
        borderColor: "#77DB88FF",
        borderRadius: 13,
    },
    
    text: {
        color: "#000",
        fontFamily: 'Comfortaa',
        fontSize: 12, 
        fontWeight: '600',
    },
});