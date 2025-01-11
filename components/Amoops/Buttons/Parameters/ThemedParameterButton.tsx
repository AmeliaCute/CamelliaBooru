import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, ViewProps, Text, StyleSheet } from "react-native";
import { BaseButtonProps } from "../Common/BaseButton";

export type CategoriesButtonProps = BaseButtonProps & {
    outlineWidth?: number;
    shadowOpacity?: number;

    colorPreset: 'Important' | 'Normal';
};

export function ThemedParameterButton({ style, code, icon = 'folder', title, outlineWidth, colorPreset, shadowOpacity, ...otherProps }: CategoriesButtonProps) {
    const color = useThemeColor({}, `textInputBox${colorPreset}`);
    const textColor = useThemeColor({}, `textInputColor${colorPreset}`);
    const outlineColor = useThemeColor({}, `textInputOutline${colorPreset}`);

    return (
        <TouchableOpacity style={[styles.container, style, {
            backgroundColor: color,
            borderColor: outlineColor,
            borderWidth: outlineWidth || 0,

            shadowOffset: { width: 0, height: outlineWidth || 0 },
            shadowColor: outlineColor,
            shadowRadius: 0,
            shadowOpacity: shadowOpacity || 0
        }]}
        onPressOut={code}
        >
            <IconSymbol name={icon as IconSymbolName} size={30} color={textColor}/>
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
        minHeight: 60,
        maxHeight: 60,
        overflow: 'scroll', 
    },
    text: {
        width: "100%",
        fontFamily: 'Comfortaa',
        fontWeight: '700',
    },
});