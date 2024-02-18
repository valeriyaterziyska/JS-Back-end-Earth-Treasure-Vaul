const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');


router.get('/', async (req, res) => {
    const stones = await stoneService.getLastThree().lean();
    res.render('home', { stones });
});

router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll().lean();

    res.render('dashboard', { stones });
});

router.get('/search', async (req, res) => {
    const { name } = req.query;
    const stone = await stoneService.search(name).lean();

    res.render('search', { stone });
});

module.exports = router;

