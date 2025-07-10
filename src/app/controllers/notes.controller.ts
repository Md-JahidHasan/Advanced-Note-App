
import express, { Request, Response } from "express";
import Note from "../models/notes.model";



export const notesRoute = express.Router()


notesRoute.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  // Approach 1 of creating a data
  // const myNote = new Note({
  //     title: "Learning Mongoose"
  // })
  // await myNote.save()

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

notesRoute.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: notes,
  });
});

notesRoute.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Note found successfuy",
    note: note,
  });
});

notesRoute.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const updatedNote = await Note.findByIdAndUpdate(noteId, updatedBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Note updated successfully",
    note: updatedNote,
  });
});

notesRoute.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const updatedNote = await Note.findByIdAndDelete(noteId);

    res.status(201).json({
      
    success: true,
    message: "Note deleted successfully",
    note: updatedNote,
  });
});

