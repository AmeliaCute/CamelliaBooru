import { User } from "@/constants/Amoops"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { AccountButton } from "../../Buttons/AccountButton"
import { CategoriesButton } from "../../Buttons/CategoriesButton"
import Globals from "@/constants/Globals"
import { Server } from "@/modules/Server"
import { useRouter } from "expo-router"

type Home_HeaderProps = {
    onServerChange: (newServer: Server) => void;
};
  
export function Home_Header({ onServerChange, ...otherProps }: Home_HeaderProps) {
    const router = useRouter();
    const addServer = () =>
    {
        router.push(
            "/parameters/ServerRegister"
        )
    }

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
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 200,

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