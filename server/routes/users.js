var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken')
var User = require("../models/user");

/* GET users listing. */
router.post("/register", function(req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return res.json({
      error: "failed to create user"
    });
    res.json({
      message: "user created",
      user
    });
  });
});


router.post('/login',(req, res, next)=>{
  User.findOne({ email: req.body.email }, (err, user)=>{
    if(err) return res.status(500).next(err);
    if(!user) return res.status(400).json({
      error: 'user not found'
    })
    // console.log(user);
    const password = req.body.password;
    console.log(user, 'user');
    if(!user.validatePassword(password)) return res.status(400).json({
      error: 'password is invalid'
    })
    const {username, email} = user
    const token = jwt.sign({ user }, 'todoapp');
    res.json({
      message:'user login succesful',
      token,
      email,
      username
    })
  })
})


router.post('/:id/update',(req, res, next)=>{
  var id = req.params.id
  User.findByIdAndUpdate(id, req.body,{new:true},(err, user)=>{
    if(err) return res.status(400).json({
      error:"couldnt update user"
    })
  })
})

module.exports = router;
