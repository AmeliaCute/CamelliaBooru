import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, TextInput, TextInputProps } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    code?: () => void;
    icon?: string;
    title?: string;
    outlineWidth?: number
    shadowOpacity?: number

    themeColor: string
    themeColorText: string
    themeColorOutline: string

    onSearch?: (query: string) => void;
};

export function HeaderTextInput({ style, code, icon, title, outlineWidth, themeColor, themeColorText, themeColorOutline, shadowOpacity, onSearch, ...otherProps }: ThemedTextInputProps) {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <IconSymbol name={icon} size={30} color={"#FFF"}/>
            <TextInput
                style={styles.text}
                placeholder={title}
                placeholderTextColor={"#FFF"}
                value={text}
                onChangeText={setText}
                onEndEditing={() => onSearch && onSearch(text)}
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 12,
        justifyContent: 'flex-start',
        height: 45,
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