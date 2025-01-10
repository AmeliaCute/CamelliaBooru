import{ ReactNode } from "react"
import { StyleSheet } from "react-native"
import { Server } from "@/modules/Server"

type CommonHeaderProps = {
    onServerChange: (newServer: Server) => void;
    children?: ReactNode;
};

export const baseHeaderstyles = StyleSheet.create({
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
});