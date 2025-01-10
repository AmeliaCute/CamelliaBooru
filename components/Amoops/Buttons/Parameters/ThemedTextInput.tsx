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

export function ThemedTextInput({ style, code, icon, title, outlineWidth, themeColor, themeColorText, themeColorOutline, shadowOpacity, onSearch, ...otherProps }: ThemedTextInputProps) {
    const [text, setText] = useState('');

    const color = useThemeColor({}, themeColor);
    const textColor = useThemeColor({}, themeColorText);
    const outlineColor = useThemeColor({}, themeColorOutline);

    return (
        <View style={[styles.container, {
            backgroundColor: color,
            borderColor: outlineColor,
            borderWidth: outlineWidth || 0,

            shadowOffset: { width: 0, height: outlineWidth || 0 },
            shadowColor: outlineColor,
            shadowRadius: 0,
            shadowOpacity: shadowOpacity || 0
        }]}>
            <IconSymbol name={icon} size={30} color={textColor}/>
            <TextInput
                style={[styles.text, {color: textColor}]}
                placeholder={title}
                placeholderTextColor={textColor}
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
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 16,
        height: 60,
        maxHeight: 60
    },
    text: {
        width: '100%',
        fontFamily: 'Comfortaa',
        fontWeight: '700',
        justifyContent: 'center',
    },
});