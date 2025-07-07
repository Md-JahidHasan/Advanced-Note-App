import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5001;


async function main() {
    try {

        await mongoose.connect(
          "mongodb+srv://TotoApp:todoapp@cluster0.ptptzcl.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("Connected to mongodb using mongoose");
        
        server = app.listen(PORT, () => {
            console.log(`App listen in port ${PORT}`);
            
        })
        


    } catch (error) {
        console.log(error);
        
    }
}

main()