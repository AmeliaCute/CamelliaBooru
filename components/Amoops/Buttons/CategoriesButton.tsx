import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps } from 'react-native';
import * as Haptics from 'expo-haptics';

import { IconSymbol } from '../../ui/IconSymbol';
import { IconSymbolName } from '../../ui/IconSymbol';

export type CategoriesButtonProps = ViewProps & {
    code?: () => void;
    icon?: IconSymbolName;
    title?: string;
};

export function CategoriesButton({ style, code, icon = "folder", title, ...otherProps }: CategoriesButtonProps) {
    const runner = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (code) {
            code(); // Call the code function
        }
    };

    return (
        <TouchableOpacity onPress={runner} style={{ height: 45 }}>
            <View style={styles.container}>
                <IconSymbol name={icon} size={30} color={"#FFF"} />
                {title ? (
                    <Text style={styles.text}>{title}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#B785EAFF",
        borderWidth: 1,
        borderColor: "#D1ACF6FF",
        borderRadius: 13,
    },
    text: {
        color: "#FFF",
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
});