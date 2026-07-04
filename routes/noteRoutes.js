const express = require("express");

const router = express.Router();

const { createNote, getAllNotes, updateNote, deleteNote } = require("../controllers/noteController");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getAllNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
module.exports = router;