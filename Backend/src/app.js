const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

// post api

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note create successfully",
       })
})

//get note api

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note fetch successfully",
        notes
    })
})


app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id

    const note = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted successfully.",
        note
    })

})

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body

    await noteModel.findByIdAndUpdate(id, { title, description })


    res.status(200).json({
        message: "note updated successfully."
    })
})


console.log(__dirname);



app.use('*name', (req,res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))

})


module.exports = app