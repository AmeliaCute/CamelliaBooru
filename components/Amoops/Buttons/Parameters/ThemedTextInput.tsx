import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, TextInput, TextInputProps } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    style?: ViewProps['style'];
    code?: () => void;
    icon?: IconSymbolName;
    title?: string;
    outlineWidth?: number
    shadowOpacity?: number

    colorPreset: 'Important' | 'Normal';

    onSearch?: (query: string) => void;
};

export function ThemedTextInput({ style, code, icon = 'folder', title, outlineWidth, colorPreset, shadowOpacity, onSearch, ...otherProps }: ThemedTextInputProps) {
    const [text, setText] = useState('');
    
    const color = useThemeColor({}, `textInputBox${colorPreset}`);
    const textColor = useThemeColor({}, `textInputColor${colorPreset}`);
    const outlineColor = useThemeColor({}, `textInputOutline${colorPreset}`);


    return (
        <View style={[styles.container, style, {
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
                
                scrollEnabled={true}
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
        width: '100%',
        flexDirection: 'row',
        padding: 30,
        paddingHorizontal: 15,
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 16,
        height: 60,
        maxHeight: 60,
    },
    text: {
        flexGrow: 1,
        flex: 1,
        height: 60,
        fontFamily: 'Comfortaa',
        fontWeight: '700',
    },
});