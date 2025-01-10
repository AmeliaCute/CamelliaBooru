import { ThemedParameterButton } from "@/components/Amoops/Buttons/Parameters/ThemedParameterButton";
import { ThemedTextInput } from "@/components/Amoops/Buttons/Parameters/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

export default function ServerRegister() {
    return (
        <ThemedView style={styles.container}>
            <ThemedTextInput 
                icon="globe"
                title="Server Url"
                outlineWidth={3} 
                
                shadowOpacity={1}
                themeColor={"textInputBoxImportant"} 
                themeColorText={"textInputColorImportant"} 
                themeColorOutline={"textInputOutlineImportant"}    
            />
           <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
            <ThemedView style={styles.optional}>
                <View style={styles.optionalTextContainer}>
                    <IconSymbol name={"magnifyingglass"} size={24} color={useThemeColor({}, 'textInputColorNormal')}/>
                    <Text style={[styles.optionalText, {color: useThemeColor({}, 'textInputColorNormal')}]}>Optional</Text>
                </View>
                <ThemedTextInput 
                    style={{marginBottom: 10}}
                    icon="doc"
                    title="Name"
                    outlineWidth={2} 

                    themeColor={"textInputBoxNormal"} 
                    themeColorText={"textInputColorNormal"} 
                    themeColorOutline={"textInputOutlineNormal"}    
                />

                <ThemedTextInput 
                    icon="person.crop.circle"
                    title="User ID"
                    outlineWidth={2} 

                    themeColor={"textInputBoxNormal"} 
                    themeColorText={"textInputColorNormal"} 
                    themeColorOutline={"textInputOutlineNormal"}    
                />

                <ThemedTextInput 
                    icon="lock"
                    title="API secret"
                    outlineWidth={2} 

                    themeColor={"textInputBoxNormal"} 
                    themeColorText={"textInputColorNormal"} 
                    themeColorOutline={"textInputOutlineNormal"}    
                />

                
            </ThemedView>
        </KeyboardAvoidingView>
            
        <ThemedParameterButton 
            style={{marginTop: 60}}
            outlineWidth={2} 
            themeColor={"textInputBoxImportant"} 
            themeColorText={"textInputColorImportant"} 
            themeColorOutline={"textInputOutlineImportant"}
            title="Register Server"
            icon="checkmark.circle"
        />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
        gap: 50,
    },
    optional: {
        gap: 10
    },
    optionalTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    optionalText: {
        fontSize: 16,
        fontFamily: 'Comfortaa',
        fontWeight: '800',
    }


});