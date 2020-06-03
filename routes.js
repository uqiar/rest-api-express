const express = require('express')
const router = express.Router()
const records = require('./db/controllers/quotes')
const users = require('./db/controllers/users')
const passport = require("passport");
const Authorize = passport.authenticate('jwt', { session: false })
function asyncHandler(callBack) {
    return async (req, res, next) => {
        try {
            await callBack(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

//Send a GET request to /quotes to Read list of quotes.
router.get('/quotes', Authorize, asyncHandler(async (req, res, next) => {
    const quotes = await records.getQuotes()
    res.json(quotes)

}))
//Send GET request to /quotes/:id to Read single quote
router.get('/quotes/:id', Authorize, asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    res.json(quote)
}))



//Adding new quotes
router.post('/quotes', Authorize, asyncHandler(async (req, res, next) => {
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
router.put('/quotes/:id', Authorize, asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote, req.params.id)
        res.end()
    } else {
        res.status(404).json({ message: "Quote not found." })
    }

}))
//Delete request using id to delete quote
router.delete('/quotes/:id', Authorize, asyncHandler(async (req, res, next) => {
    await records.deleteQuote(req.params.id)
    res.status(204).end()
}))


//register new users /api/register
router.post('/register', asyncHandler(async (req, res, next) => {
    const user = await users.RegisterUser(req.body)
    res.json(user)
}))

router.get('/users', Authorize, asyncHandler(async (req, res, next) => {
    const allUsers = await users.allUsers()
    res.json(allUsers)
}))
router.post('/login', asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = await users.login(req.body)
    res.json(user)
}))


module.exports = router