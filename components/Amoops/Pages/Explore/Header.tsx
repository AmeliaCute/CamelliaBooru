import { User } from "@/constants/Amoops"
import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { AccountButton } from "../../Buttons/AccountButton"
import { CategoriesButton } from "../../Buttons/CategoriesButton"
import Globals from "@/constants/Globals"
import { Server } from "@/modules/Server"
import { useRouter } from "expo-router"
import { ThemedTextInput } from "../../Buttons/Parameters/ThemedTextInput"
import { HeaderTextInput } from "../../Buttons/HeaderTextInput"

type Explore_HeaderProps = {
    onServerChange: (newServer: Server) => void;
    onSearch: (query: string) => void;
};
  
export function Explore_Header({ onServerChange, onSearch, ...otherProps }: Explore_HeaderProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const addServer = () =>
    {
        router.push(
            "/parameters/ServerRegister"
        )
    }

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
        onSearch(text);
    };

    return (
        <View style={styles.header}>
        <View style={styles.accountContent}>
            <AccountButton 
            accountName={Globals.user.name} 
            accountImage={Globals.user.pfp}
            />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContent}>
            <View style={styles.tabButtons}>
            {
                Globals.server.map((server) => server.valid ? (
                    <CategoriesButton 
                    code={() => {
                        onServerChange(server);
                    }} 
                    key={server.url}  
                    icon="folder" 
                    title={server.name} 
                    />
                ) : null)
            }

            <CategoriesButton 
                code={addServer}
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
    header: {
        width: "100%",
        height: "auto",

        paddingVertical: 10,
        gap: 10,

        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',

        backgroundColor: "#A670DCFF"
    },

    accountContent: {
        width: "100%",

        marginTop: 30,
        paddingHorizontal: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    searchContent: {
        width: "100%",

        marginTop: 5,
        paddingHorizontal: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    tabContent: {
        width: '100%',
        height: 45,

        marginHorizontal: 10,
    },

    tabButtons: {
        gap: 10,
        height: 45,
        paddingRight: 20,

        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
})