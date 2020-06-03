const express = require('express')
const routes=require('./routes')
const {db,sequelize} = require('./db');

const app = express()
app.use(express.json())
app.use('/api',routes)
const port = 3002;
(async()=>{
    require('./passport')
    await db.sequelize.sync({ force: false });
    sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch(err => console.error("Unable to connect to the database:", err))
})()
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

