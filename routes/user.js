const express = require('express')
const router = express.Router()

const { 
    userById,
    read,
    update,
    purchaseHistory
} = require('../controllers/user.js')

const { 
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth.js')

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({ user: req.profile })
})

router.get('/users/:userId', requireSignin, isAuth, read)
router.put('/users/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)

router.param('userId', userById)

module.exports = router