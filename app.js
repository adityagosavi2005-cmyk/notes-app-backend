const express = require('express');
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
    res.send("Welcome to Notes App");
});

module.exports = app;