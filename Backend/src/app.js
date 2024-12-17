// import { app } from "./lib/socket.js";
import express from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import path from "node:path";

import { createServer } from 'node:http';
import dotenv from "dotenv" ;
dotenv.config()

const app = express()


app.use(cors({
    // origin :  "https://ping-buddy-yze1.vercel.app" ,
    origin :  ['https://ping-buddy.vercel.app', 'http://localhost:5173' , "*" ] ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}))




const server = createServer(app);
const io = new Server(server, {
  cors: {
    // origin: ["https://ping-buddy-yze1.vercel.app"] ,  
    origin :  ['https://ping-buddy.vercel.app', 'http://localhost:5173', "*"] ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
  }
});


export function getReceiverSocketId(userId) {
    return usersSocketMap[userId];
  }
const usersSocketMap = {}

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    const userId = socket.handshake.query.userId ;
    if(userId) usersSocketMap[userId] = socket.id ;

    io.emit("getUsers", Object.keys(usersSocketMap))


    socket.on("disconnected",() => {
        console.log("A user disconnected", socket.id)
        delete usersSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(usersSocketMap));
    })
  });





app.use(express.json({ limit: '500mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

import authRouth from "./routes/auth.routes.js";
app.use("/v1/api/auth", authRouth)

import messageRoutes from "../src/routes/message.routes.js"
app.use("/v1/api/messages", messageRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

export  {app , io , server }
