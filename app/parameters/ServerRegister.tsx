import { ThemedParameterButton } from "@/components/Amoops/Buttons/Parameters/ThemedParameterButton";
import { ThemedTextInput } from "@/components/Amoops/Buttons/Parameters/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { ThemedDropdown } from "@/components/Amoops/Buttons/Parameters/DropdownMenu";
import Globals from "@/constants/Globals";
import { Server } from "@/modules/Server";
export default function ServerRegister() {
    const router = useRouter();

    const [serverUrl,    setServerUrl]     = useState('uri');
    const [serverName,   setServerName]    = useState('name');
    const [serverType,   setServerType]    = useState<'gelbooru2.0'  | 'gelbooru2.5' | 'amoops'>('amoops');

    const [serverUser,   setServerUser]    = useState('user');
    const [serverSecret, setServerSecret]  = useState('pass');

    const data: Item[] = [
        { Label: 'Gelbooru 2.0', Value: 'gelbooru2.0' },
        { Label: 'Gelbooru 2.5', Value: 'gelbooru2.5' },
        { Label: 'Amoops', Value: 'amoops' }
    ];

    return (
        <ThemedView style={styles.formcontainer}>
            <View style={styles.needed}>
                <ThemedTextInput 
                    style={{marginTop: 40}}
                    icon="globe"
                    title="Server Url"
                    outlineWidth={3} 
                    
                    onSearch={setServerUrl}
                    shadowOpacity={1}
                    colorPreset='Important'
                />
                <ThemedDropdown 
                    options={data} 
                    onSelect={setServerType}
                    outlineWidth={3} 
                    
                    shadowOpacity={1}
                    colorPreset='Important'
                />
            </View>

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
                        
                        onSearch={setServerName}
                        colorPreset='Normal'  
                    />

                    <ThemedTextInput 
                        icon="person.crop.circle"
                        title="User ID"
                        outlineWidth={2} 

                        onSearch={setServerUser}
                        colorPreset='Normal'  
                    />

                    <ThemedTextInput 
                        icon="lock"
                        title="API secret"
                        outlineWidth={2} 

                        onSearch={setServerSecret}
                        colorPreset='Normal'     
                    />

                   
                </ThemedView>
            </KeyboardAvoidingView>
                
            <ThemedParameterButton 
                code={
                    async () => {
                        Globals.addServer(
                            new Server(serverType, serverName, serverUrl, serverSecret, serverUser)
                        )
                        
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
    needed: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    optional: {
        display: 'flex',
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