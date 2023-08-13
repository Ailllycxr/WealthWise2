//post
const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;  
        res.json({ user: userData, message: 'You are now logged in!'});
      });
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  });

  module.exports = router