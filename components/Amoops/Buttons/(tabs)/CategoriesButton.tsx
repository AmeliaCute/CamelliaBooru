import { Button, TouchableOpacity, View, StyleSheet, Text, type ViewProps, Image } from 'react-native';
import * as Haptics from 'expo-haptics';

import { IconSymbol, IconSymbolName } from '../../../ui/IconSymbol';
import { BaseButtonProps } from '../Common/BaseButton';

export function CategoriesButton({ style, code, icon = "folder", title, Haptic = Haptics.ImpactFeedbackStyle.Medium, iconIsImage = false, ...otherProps }: BaseButtonProps) {
    const runner = () => {
        Haptics.impactAsync(Haptic);
        if (code)
        code(); 
    };


    return (
        <TouchableOpacity onPress={runner} style={{ height: 45 }}>
            <View style={styles.container}>
                { iconIsImage ? ( 
                        <Image
                            source={{ uri: icon }}
                            style={styles.image}
                        />
                    ): 
                    (
                        <IconSymbol name={icon as IconSymbolName} size={30} color={"#FFF"} />  
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
    image: {
        width: 30, 
        height: 30, 
        resizeMode: 'cover',

        borderRadius: 6.5,
        borderWidth: 2,
        borderColor: "#FFF"
    }
});