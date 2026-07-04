const Note = require("../models/Note");

const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const userId = req.user._id;

        await Note.create({
            title,
            content,
            user: userId
        });

        return res.status(201).json({
            success: true,
            message: "Note created successfully"
        });

    } catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};

const getAllNotes = async(req, res) =>{
    try{

        const userId = req.user._id;
        const notes = await Note.find({
            user : userId
        });

        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            notes
        })

    } catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};

const updateNote = async(req, res) =>{
    try{
        const { title, content } = req.body;

        const userId = req.user._id;

        const noteId = req.params.id;

        const note = await Note.findById(noteId);

        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note not found"
            });
        }

        if(note.user.toString() !== userId.toString()){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this note."
            });
        }
        
        if(title){
            note.title = title;
        }

        if(content){
            note.content = content;
        }

        await note.save();

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        });

    } catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message: "Internal server error"
        });

    }
};

const deleteNote = async(req, res) =>{
    try{
        const userId = req.user._id;

        const noteId = req.params.id;

        const note = await Note.findById(noteId);

        if(!note){
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if(note.user.toString() !== userId.toString()){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete the note"
            });
        }

        await note.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
};