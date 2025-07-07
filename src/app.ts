import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import Note from "./app/models/notes.model";
import { notesRoute } from "./app/controllers/notes.controller";
import { usersRoute } from "./app/controllers/user.controller";


const app: Application = express()
app.use(express.json())

app.use("/notes", notesRoute)
app.use("/users", usersRoute)

app.get('/', (req: Request, res: Response) => {
    res.send("Wellcomw to NOte APP")
})




export default app;