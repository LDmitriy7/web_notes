"use strict"

let express = require('express')
let app = express()
let uuid = require('uuid')

const NOTES = {}

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/add-note', (req, res) => {
    let text = req.query.text

    if (!text) {
        res.send({ok: false, error: 'invalid note text'})
        return
    }

    let noteId = uuid.v4()

    NOTES[noteId] = text
    res.send({ok: true, id: noteId})
})

app.get('/delete-note', (req, res) => {
    let noteId = req.query.id

    if (!noteId) {
        res.send({ok: false, error: 'invalid note id'})
        return
    }

    delete NOTES[noteId]
    res.send({ok: true})
})

app.get('/notes', (req, res) => {
    res.send(NOTES)
})

app.get('/favicon.ico', (req, res) => {
    res.redirect('/static' + req.path)
})

app.get('/test', (req, res) => {
    res.send({ok: true})
})

app.use('/static', express.static('static'))

app.listen(80)
