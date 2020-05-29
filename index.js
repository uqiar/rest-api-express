const express = require('express')
const records = require('./records')

const app = express()
app.use(express.json())
const port = 3002;

function asyncHandler(callBack) {
    return async(req, res, next) => {
        try {
            await callBack(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

//Send a GET request to /quotes to Read list of quotes.
app.get('/quotes', asyncHandler(async (req, res, next) => {
    const quotes = await records.getQuotes()
    res.json(quotes)

}))
//Send GET request to /quotes/:id to Read single quote
app.get('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    res.json(quote)
}))
//Adding new quotes
app.post('/quotes', asyncHandler(async (req, res, next) => {
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
}))

//update quote to passing id
app.put('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote)
        res.end()
    } else {
        res.status(404).json({ message: "Quote not found." })
    }

}))
//Delete request using id to delete quote
app.delete('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    await records.deleteQuote(quote)
    res.status(204).end()
}))
//handle not fond request
app.use((req, res, next) => {
    const err = new Error("Not Found.");
    err.status = 404;
    next(err)
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message })
})
app.listen(port, (err => {
    if (err)
        console.log("failed to running server!")
    else
        console.log(`Server is running on port ${port}`)
}))

