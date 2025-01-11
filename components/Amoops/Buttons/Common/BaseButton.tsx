import { TouchableOpacity, View, Text, StyleSheet, type ViewProps, Image } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import * as Haptics from 'expo-haptics';

export type BaseButtonProps = ViewProps & {
    code?: () => void;
    icon?: IconSymbolName | string;
    iconIsImage?: boolean;
    title?: string;
    outlineWidth?: number;
    shadowOpacity?: number;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;

    Haptic?: Haptics.ImpactFeedbackStyle
};

export function BaseButton({ style, code, icon = 'folder', iconIsImage = false, title, outlineWidth, shadowOpacity, backgroundColor, textColor, borderColor, Haptic = Haptics.ImpactFeedbackStyle.Medium, ...otherProps }: BaseButtonProps) {
    const runner = () => 
    {
        Haptics.impactAsync(Haptic);
        if (code) code();
    };


    return (
        <TouchableOpacity onPress={runner} style={{ height: 45 }}>
            <View style={[styles.container, style, {
                backgroundColor,
                borderColor,
                borderWidth: outlineWidth || 0,
                shadowOffset: { width: 0, height: outlineWidth || 0 },
                shadowColor: borderColor,
                shadowRadius: 0,
                shadowOpacity: shadowOpacity || 0,
            }]}>
                { iconIsImage ? 
                    ( 
                        <Image source={{uri: icon}} style={
                            { borderRadius: 13, resizeMode: 'cover', width: 30, height: 30 
                                
                            }}
                            onError={(error) => console.log('Error loading image:', error)} />
                    ): 
                    (
                        <IconSymbol name={icon as IconSymbolName} size={30} color={textColor} />  
                    )
                }
                
                {title ? (
                    <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
        borderRadius: 13,
    },
    text: {
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
});