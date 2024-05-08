const {Router} = require('express')
const User = require('../models/User')
const bcript = require('bcryptjs')
const router = Router()

router.post('/register', async (req, res) =>{
    try{
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if(candidate){
           return res.status(400).json({message: 'this user exists'})
        }

        const hashedPassword = await bcript(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(401).json({message: 'user created'})
    }catch (e) {
        res.status(500).json({message: 'Error, try again...('})
    }
})

router.post('/login', async (req, res) =>{

})


module.exports = router