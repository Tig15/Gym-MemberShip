const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 1504

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //For Serving Static Files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Pug Template
app.set('views', path.join(__dirname, 'views')) // Views Directory

// ENDPOINTS
app.get("/",(req,res)=>{
    const con = "This is a best gym nearby you,fill up the form and check out our place."
    const params = {"title":"Best Gym", "content":con}
    res.status(200).render('index.html', params)
})

app.post("/", (req,res)=>{
    names = req.body.name
    email = req.body.email
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.about

    let OutputtoWrite = `The name of client is ${names} and email id is ${email}, ${age} years old, ${gender}, residing at${address} and about him/her: ${more}`
    fs.writeFileSync('output.txt', OutputtoWrite)
    const params = {'message' : "Your Form has been submitted successfully to us!"}
    res.status(200).render('index.html', params)
})

// START THE SERVER
app.listen(port, () =>{
    console.log(`This application started successfully at port ${port} `)
})