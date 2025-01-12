import { makeAutoObservable, action, runInAction } from "mobx";
import { Server } from "@/modules/Server";
import { User } from "./Amoops";
import AsyncStorage from "@react-native-async-storage/async-storage";

class GlobalsT {
    server: Server[] = [];
    currentServer: Server | null = null;
    user: User = {name: "Test", uid: "a1b2c3", pfp: { uri: "https://safebooru.org//samples/1/sample_e7b3dc281d431f7a9f4ab81986d2de9a20d36d2e.jpg" }};

    constructor() 
    {
        makeAutoObservable(this, {
            addServer: action,
        });
    }

    async saveServers() {
        try {
            const serializedServers = JSON.stringify(
                this.server.map((server) => ({
                    type: server.type,
                    name: server.name,
                    url: server.url,
                    key: server.key,
                    id: server.id,
                    isdefault: server.isdefault,
                }))
            );
            await AsyncStorage.setItem("servers", serializedServers);
        } catch (error) {
            console.error("Failed to save servers:", error);
        }
    }

    async loadServers() {
        try {
            const serializedServers = await AsyncStorage.getItem("servers");
            if (serializedServers) {
                const parsedServers = JSON.parse(serializedServers);
                runInAction(() => {
                    this.server = parsedServers.map((data: any) => new Server(
                        data.type,
                        data.name,
                        data.url,
                        data.key,
                        data.id,
                        data.isdefault
                    ));

                    if(this.server.length === 0) return;
                    
                    if (this.server.some((s: Server) => s.isdefault)) {
                        this.currentServer = this.server.find((s: Server) => s.isdefault);
                    } else {
                        this.currentServer = this.server[0];
                    }
                });
            }
        } catch (error) {
            console.error("Failed to load servers:", error);
        }
    }

    async addServer(server: Server) {
        console.log("Adding server: ", server);
        if (this.server.find((s) => s.url === server.url)) {
            console.log("Server already exists.");
            return;
        }

        const isLoaded = await server.load();
        if (isLoaded) {
            console.log("Server loaded: ", server);
            runInAction(() => {
                this.server.push(server);
            });
            await this.saveServers();
        }
    }
}

const Globals = new GlobalsT();
export default Globals;