const {Router} = require('express')
const User = require('../models/User')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Failed email').isEmail,
        check('password', 'minimal symbol 6')
            .isLength({min: 6})
    ],
    async (req, res) =>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message: 'Uncorrected data for register'
            })
        }

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

router.post(
    '/login',
    [
        check('email', 'Enter a valid Email').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message: 'Uncorrected data for login'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'User is not find'})
        }

        const isMatch = await bcript.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'User is not find, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1H'}
        )

        res.json({token, userId: user.id})

    }catch (e) {
        res.status(500).json({message: 'Error, try again...('})
    }
})


module.exports = router