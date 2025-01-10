import { Server } from "@/modules/Server";
import { User } from "./Amoops";

class Globals {
    static server: Server[] = [];
    static currentServer: Server;
    // load image from url
    static user: User = {name: "Test", uid: "a1b2c3", pfp: { uri: "https://safebooru.org//samples/1/sample_e7b3dc281d431f7a9f4ab81986d2de9a20d36d2e.jpg" }};

}

export default Globals;