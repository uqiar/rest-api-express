const express = require('express')
const routes=require('./routes')

const app = express()
app.use(express.json())
app.use('/api',routes)
const port = 3002;


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

