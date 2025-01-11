import { TouchableOpacity, View, Text, Image, StyleSheet, type ViewProps } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { BaseButtonProps } from '../Buttons/Common/BaseButton';

export type AccountButtonProps = BaseButtonProps & {
    icon: IconSymbolName,
    info: string
};

export function HeaderAlertWidget({ style, code, icon, info }: AccountButtonProps) {
    const containerColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');   
    const red = useThemeColor({}, 'red');

    return (
        <TouchableOpacity onPress={code} style={{ paddingHorizontal: 10, marginBottom: 5, height: 45 }}>
            <View style={[styles.container, {backgroundColor: containerColor}]}>
                <IconSymbol name={icon} style={styles.profileImage} color={red} />
                <Text style={[styles.text, {color: textColor}]}>{info}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#FFFFFFFF",
        borderRadius: 13,
        shadowRadius: 2.5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2.5 },
    },
    profileImage: {
        width: 30,
        height: 30,
    },
    text: {
        color: "#000",
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
});