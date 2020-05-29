const express =require('express')
const router=express.Router()
const records=require('./records')
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
router.get('/quotes', asyncHandler(async (req, res, next) => {
    const quotes = await records.getQuotes()
    res.json(quotes)

}))
//Send GET request to /quotes/:id to Read single quote
router.get('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    res.json(quote)
}))

router.get('/quotes/quote/random',asyncHandler(async(req,res,next)=>{
    const quote=await records.getRandomQuote()
    res.json(quote)
}))

//Adding new quotes
router.post('/quotes', asyncHandler(async (req, res, next) => {
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
router.put('/quotes/:id', asyncHandler(async (req, res, next) => {
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
router.delete('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id)
    await records.deleteQuote(quote)
    res.status(204).end()
}))

module.exports=router