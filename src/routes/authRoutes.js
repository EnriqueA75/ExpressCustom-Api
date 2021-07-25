const express = require('express')
const router = express.Router()

router.get('/singup', (req, res) => {
    console.log(req.body)
    res.send('You made send a req')
})

module.exports = router;