import express from "express";
import http from "http";
import { Server } from "socket.io";
import prisma from "../../src/lib/db";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
    socket.on("join_workspace", async (workspaceDetails, user) => {
        const workspace = await prisma.workSpace.findUnique({
            where: { id: workspaceDetails.id },
            include: { requestedMembers: true },
        });
    
        if (workspace) {
            const updatedMembers = [
                ...workspace.requestedMembers.map((member) => member.id),
                user.id,
            ];
    
            try {
                await prisma.workSpace.update({
                    where: { id: workspaceDetails.id },
                    data: {
                        joinRequests: { increment: 1 },
                        requestedMembers: {
                            connect: updatedMembers.map((id) => ({ id })),
                        },
                    },
                });
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }
    
        console.log(`User with ID: ${socket.id} joined room: ${workspaceDetails}`);
    });

    socket.on("approve_request",async(workSpaceDetails,user)=>{
        const workspace = await prisma.workSpace.findUnique({
            where:{id:workSpaceDetails.id},
            include:{members:true}
        })
        if(workspace)
        {
            const updatedMembers = [...(workspace.members.map((member)=>member.id) ),user.id];
            try {
                await prisma.workSpace.update({
                    where:{id:workSpaceDetails.id},
                    data:{joinRequests:{decrement:1},
                    members:{set:updatedMembers}
                }
                })
                console.log("request approved");
            } catch (error) {
                if(error instanceof Error)
                {
                    console.log(error.message);
                }
            }
        }
    })

    socket.on("send_message",({roomname,data})=>{
        console.log(data);
        socket.to(roomname).emit("message",data);
    })

    socket.on("leave_room",(workspacename)=>{ 
        socket.leave(workspacename);
        console.log("User with ID: ${socket.id} left room: ${workspacename}");

        socket.to(workspacename).emit("user_left",socket.id);
    })

})

server.listen(3001, () => {
    console.log("WS server is running on port 3001");
})


