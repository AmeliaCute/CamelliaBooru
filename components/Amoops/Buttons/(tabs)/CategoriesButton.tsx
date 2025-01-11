import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, Image } from 'react-native';
import * as Haptics from 'expo-haptics';

import { IconSymbol, IconSymbolName } from '../../../ui/IconSymbol';
import { BaseButtonProps } from '../Common/BaseButton';
import { useThemeColor } from '@/hooks/useThemeColor';

export function CategoriesButton({ style, code, icon = "folder", title, Haptic = Haptics.ImpactFeedbackStyle.Medium, iconIsImage = false, ...otherProps }: BaseButtonProps) {
    const runner = () => {
        Haptics.impactAsync(Haptic);
        if (code)
        code(); 
    };

    const backgroundColor = useThemeColor({}, 'headerObjectBackground');
    const borderColor = useThemeColor({}, 'headerObjectBorder');
    const text = useThemeColor({}, 'background');

    return (
        <TouchableOpacity onPress={runner} style={{ height: 45 }}>
            <View style={[styles.container, {backgroundColor: backgroundColor, borderColor: borderColor}]}>
                { iconIsImage ? ( 
                        <Image
                            source={{ uri: icon }}
                            style={[styles.image, {borderColor: borderColor}]}
                        />
                    ): 
                    (
                        <IconSymbol name={icon as IconSymbolName} size={30} color={'#FFF'} />  
                    )
                }
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
        borderWidth: 1,
        borderRadius: 13,
        
      
    },
    text: {
        color: "#FFF",
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
    image: {
        width: 30, 
        height: 30, 
        resizeMode: 'cover',

        borderRadius: 6.5,
        borderWidth: 2,

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2.5 },
    }
});