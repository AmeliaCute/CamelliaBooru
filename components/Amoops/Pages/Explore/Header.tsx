import React, { useState } from "react"
import { Server } from "@/modules/Server"
import { HeaderTextInput } from "../../Buttons/(tabs)/HeaderTextInput"
import { ScrollView, StyleSheet, View } from "react-native"
import { baseHeaderstyles, CommonHeaderProps } from "../Common/BaseHeader";
import { AccountButton } from "../../Buttons/(tabs)/AccountButton";
import { toJS } from "mobx";
import Globals from "@/constants/Globals";
import { CategoriesButton } from "../../Buttons/(tabs)/CategoriesButton";
import { useNavigation, useRouter } from "expo-router";

type Explore_HeaderProps = CommonHeaderProps & {
    onSearch: (query: string) => void;
};

export function Explore_Header({ onServerChange, onSearch }: Explore_HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearchChange = (text: string) => {
        console.log(searchQuery)
        setSearchQuery(text);
        onSearch(text);
    };

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
            <View style={styles.searchContent}>
                <HeaderTextInput
                    icon="magnifyingglass"
                    title="Search"
                    outlineWidth={2}
                    themeColor={"textInputBoxNormal"}
                    themeColorText={"textInputColorNormal"}
                    themeColorOutline={"textInputOutlineNormal"}
                    value={searchQuery}
                    onSearch={handleSearchChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContent: {
        width: "100%",
        marginTop: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
});