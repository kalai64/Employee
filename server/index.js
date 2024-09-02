const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const usermodel = require('./model/user')
const {body, validationResult} = require('express-validator')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://kalai6464:kalai6464@cluster0.suros08.mongodb.net/crud')
    .then(() => console.log(`Mongoose Connected`))
    .catch(err => console.log(err))

// Validation middleware

const validation =[
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('address').isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
    body('age').isInt({ min: 0 }).withMessage('Please Enter Age in Number'),
    body('department').not().isEmpty().withMessage('Department is required'),
    body('status').not().isEmpty().withMessage('Status is required'),

]

app.get('/',(req,res)=>{
    res.send(`<h1>Server is live</h1>`)
})

app.post('/create',validation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    usermodel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/users', (req, res) => {
    usermodel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/getuser/:id', (req, res) => {
    const id = req.params.id
    usermodel.findById(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.put('/updateuser/:id',validation, (req, res) => {
    const id = req.params.id

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    usermodel.findByIdAndUpdate(id, { 
        name: req.body.name, 
        address:req.body.address, 
        age: req.body.age, 
        department: req.body.department, 
        status: req.body.status  
    }, { new: true })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id
    usermodel.findByIdAndDelete(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.listen(8000, () => console.log(`Port is running on 8000`))
