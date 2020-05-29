const express = require('express')
const records = require('./records')

const app = express()
app.use(express.json())
const port = 3002;

//Send a GET request to /quotes to Read list of quotes.
app.get('/quotes', async (req, res) => {
    try {
        const quotes = await records.getQuotes()
        res.json(quotes)
    } catch (err) {
        res.json(err)
    }

})
//Send GET request to /quotes/:id to Read single quote
app.get('/quotes/:id', async (req, res) => {
    try {
        const quote = await records.getQuote(req.params.id)
        res.json(quote)
    } catch (err) {
        res.json(err)
    }

})
//Adding new quotes
app.post('/quotes', async (req, res) => {
    try {
        if (!req.body.quote || !req.body.author)
            return res.status(400).json({ message: "quote and author required." })
        const data = {
            quote: req.body.quote,
            author: req.body.author
        }
        const quote = await records.createQuote(data)
        if (quote)
            res.status(201).json(quote)
        else
            res.status(404).json({ message: "Quote not found." })
    } catch (err) {
        res.status(500).json(err)
    }

})

app.listen(port, (err => {
    if (err)
        console.log("failed to running server!")
    else
        console.log(`Server is running on port ${port}`)
}))

