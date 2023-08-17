const router = require('express').Router();
const userRoutes = require('./user.js');
const revenueRoutes = require('./revenue');
const expenseRoutes = require('./expense');
const sessionRoutes = require('./session');


router.use('/user', userRoutes);
router.use('/revenue', revenueRoutes);
router.use('/expense', expenseRoutes);
router.use('/session', sessionRoutes);


module.exports = router;
