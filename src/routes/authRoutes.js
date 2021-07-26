const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password })
        await user.save()
        const token = jwt.sign({ userId: user._id,}, 'SECRET_KEY_AKJJ')
        res.send({token})
    } catch (error) {
        console.log(error)
        return res.status(422).send(error.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ){
        return res.status(422).send({error: 'You must provide email and password'})
    }
    const user = await User.findOne({ email })
    if(!user){
        return res.status(422).send({error: 'Not user found'})
    }
    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY_AKJJ')
        res.send({token})
    } catch (error) {
        return res.status(422).send({error: 'Invalid password or email'})
    }
})
module.exports = router;