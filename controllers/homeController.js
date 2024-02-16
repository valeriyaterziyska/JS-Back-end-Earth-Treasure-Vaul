const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/autorized', isAuth,  (req, res) => {
    res.send('U are autorized'); 
})

module.exports = router;

