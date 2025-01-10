import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, TextInput } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export type CategoriesButtonProps = ViewProps & {
    code?: () => void;
    icon?: string;
    title?: string;
    outlineWidth?: number
    shadowOpacity?: number

    themeColor: string
    themeColorText: string
    themeColorOutline: string

};

export function ThemedParameterButton({ style, code, icon, title, outlineWidth, themeColor, themeColorText, themeColorOutline, shadowOpacity, ...otherProps }: CategoriesButtonProps) {
    const color = useThemeColor({}, themeColor);
    const textColor = useThemeColor({}, themeColorText);
    const outlineColor = useThemeColor({}, themeColorOutline);

    return (
        <TouchableOpacity style={[styles.container, style, {
            backgroundColor: color,
            borderColor: outlineColor,
            borderWidth: outlineWidth || 0,

            shadowOffset: { width: 0, height: outlineWidth || 0 },
            shadowColor: outlineColor,
            shadowRadius: 0,
            shadowOpacity: shadowOpacity || 0
        }]}>
            <IconSymbol name={icon} size={30} color={textColor}/>
            <Text style={[styles.text, {color: textColor}]}> {title} </Text>
        </TouchableOpacity>
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
        width: "100%",
        fontFamily: 'Comfortaa',
        fontWeight: '700',
    },
});