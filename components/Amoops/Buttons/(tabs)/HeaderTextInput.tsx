import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, TextInput, TextInputProps } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    code?: () => void;
    icon?: IconSymbolName;
    title?: string;
    outlineWidth?: number
    shadowOpacity?: number

    themeColor: string
    themeColorText: string
    themeColorOutline: string

    onSearch?: (query: string) => void;
};

export function HeaderTextInput({ style, code, icon = 'folder', title, outlineWidth, themeColor, themeColorText, themeColorOutline, shadowOpacity, onSearch = () => {}, ...otherProps }: ThemedTextInputProps) {
    const [text, setText] = useState('');
    const backgroundColor = useThemeColor({}, 'headerObjectBackground');
    const borderColor = useThemeColor({}, 'headerObjectBorder');

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor, borderColor: borderColor}]}>
            <IconSymbol name={icon} size={30} color={"#FFF"}/>
            <TextInput
                style={styles.text}
                placeholder={title}
                placeholderTextColor={"#FFF"}
                value={text}
                onChangeText={setText}
                onEndEditing={() => onSearch(text)}
                autoCorrect={false}
                autoComplete='off'
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

        textOverflow: 'scroll',
        overflow: 'hidden',

        backgroundColor: "#B785EAFF",
        borderWidth: 1,
        borderColor: "#D1ACF6FF",
        borderRadius: 13,
    },
    text: {
        flex: 1,
        color: "#FFF",
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
});