const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const authMiddleware = require("../middleware/auth.middleware")


//создаем роут,
router.post(
  '/login',
  //первый парам поле которое надо валидировать
  [
    check('email',"Incorrect email").isLength({min: 4, max:20}),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max:12})
  ],
  async (req, res) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(401).json({message: 'Incorrect request ', error})
    }
    const {email, password} = req.body
    // проверяем есть ли пользователь в нашей базе данных
    const candidate = await User.findOne({email})
    // если есть выдаем ошибку
    if (candidate) {
      //return res.status(401).json({message: `User with email ${email} already exists`})
      const isPassValid = bcrypt.compareSync(password, candidate.password)
      if (!isPassValid) {
        return res.status(404).json({message: 'Invalid password'})
      }
      const token = jwt.sign({id: candidate.id}, config.get('secretKey') , {expiresIn:'1h'})
      return res.json({
        token,
        user: {
          id: candidate.id,
          email: candidate.email,
          userName: candidate.userName
        }
      })
    }
    // хешируем пароль
    const hashPass = bcrypt.hashSync(password, 7)
    // создаем нового пользователя
    const user = new User({email, password: hashPass})
    // сохраним пользователя в базе данных
    await user.save()
    return res.json({message: "User was created"})
  } catch (e) {
    console.log(e)
    res.send("Server error ", e)
  }
  }
)


router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id})
    if (!user) {
      res.status.status(401).json({message: 'Hey'})
    }
    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"})
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName
      }
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
