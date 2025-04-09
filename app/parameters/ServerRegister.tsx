import { ThemedParameterButton } from "@/components/Amoops/Buttons/Parameters/ThemedParameterButton";
import { ThemedTextInput } from "@/components/Amoops/Buttons/Parameters/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";

export default function ServerRegister() {
    const router = useRouter();

    return (
        <ThemedView style={styles.formcontainer}>
            <ThemedTextInput 
                style={{marginTop: 40}}
                icon="globe"
                title="Server Url"
                outlineWidth={3} 
                
                shadowOpacity={1}
                colorPreset='Important'
            />
            <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <ThemedView style={styles.optional}>
                    <View style={styles.optionalTextContainer}>
                        <IconSymbol name={"magnifyingglass"} size={24} color={useThemeColor({}, 'textInputColorNormal')}/>
                        <Text style={[styles.optionalText, {color: useThemeColor({}, 'textInputColorNormal')}]}>Optional</Text>
                    </View>
                    <ThemedTextInput 
                        icon="doc"
                        title="Name"
                        outlineWidth={2} 

                        colorPreset='Normal'  
                    />

                    <ThemedTextInput 
                        icon="person.crop.circle"
                        title="User ID"
                        outlineWidth={2} 

                        colorPreset='Normal'  
                    />

                    <ThemedTextInput 
                        icon="lock"
                        title="API secret"
                        outlineWidth={2} 

                        colorPreset='Normal'     
                    />

                    
                </ThemedView>
            </KeyboardAvoidingView>
                
            <ThemedParameterButton 
                code={
                    async () => {
                        // wip func 
                        
                        router.back();
                    }
                }
                outlineWidth={2} 
                colorPreset='Important'
                title="Register Server"
                icon="checkmark.circle"
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    formcontainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
        gap: 40,
    },
    optional: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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