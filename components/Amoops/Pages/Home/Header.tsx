import React from "react"
import { Server } from "@/modules/Server"
import { ScrollView, View } from "react-native";
import { AccountButton } from "../../Buttons/(tabs)/AccountButton";
import { CategoriesButton } from "../../Buttons/(tabs)/CategoriesButton";
import Globals from "@/constants/Globals";
import { toJS } from "mobx";
import { baseHeaderstyles, CommonHeaderProps } from "../Common/BaseHeader";
import { useRouter } from "expo-router";

export function Home_Header({ onServerChange }: CommonHeaderProps) {
    const router = useRouter();

    return (
        <View style={baseHeaderstyles.header}>
            <View style={baseHeaderstyles.accountContent}>
                <AccountButton 
                    accountName={toJS(Globals.user.name)} 
                    accountImage={toJS(Globals.user.pfp)}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={baseHeaderstyles.tabContent}>
                <View style={baseHeaderstyles.tabButtons}>
                    {Globals.server.map((server) => server.valid ? (
                        <CategoriesButton 
                            code={() => onServerChange(server)} 
                            key={server.url}  
                            icon={server.icon}
                            iconIsImage={true}
                            title={server.name} 
                        />
                    ) : null)}
                    
                    <CategoriesButton 
                        code={async () => {
                            router.push('/parameters/ServerRegister');
                        }}
                        key={"addserver"} 
                        icon="plus.square.on.square"
                    />
                </View>
            </ScrollView>
        </View>
    );
}