import { Image, TouchableOpacity, View, StyleSheet, Text, type ViewProps } from 'react-native';

import { ImageSourcePropType } from 'react-native';

export type AccountButtonProps = ViewProps & {
    code?: () => void;
    accountName?: string;
    accountImage?: ImageSourcePropType;
};

export function AccountButton({ style, code, accountName, accountImage, ...otherProps }: AccountButtonProps) {
    return <TouchableOpacity onPress={code} style={{height: 45}}>
        <View style={styles.container}>
            <Image source={accountImage} style={styles.profileImage} />
            <Text style={styles.text}>{accountName}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        paddingHorizontal: 12,
        justifyContent: 'center',
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
        borderRadius: 60,
    },
    text: {
        color: "#000", 
        fontFamily: 'Comfortaa',
        fontWeight: '900',
    },
});