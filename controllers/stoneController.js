const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newStone = {
        ...req.body,
        owner: req.user._id,
    }

    try {
        await stoneService.create(newStone);

        res.redirect('/dashboard');
    } catch (err) {
        const message = getErrorMessage(err);

        res.status(400).render('create', { error: message, ...newStone });
    }
});

router.get('/stones/:stoneId', async (req, res) => {
    const stoneId = req.params.stoneId;
    try {
        const stone = await stoneService.getOne(stoneId).lean();
        const isOwner = stone.owner == req.user?._id;
        const userLiked = stone.likedList.map(userId => userId == req.user?._id); 

        res.render('stone/details', { stone, isOwner, userLiked });
    } catch (err) {
        res.render('404');
    }
});

router.get('/stones/:stoneId/like', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    try {
        const stone = await stoneService.getOne(stoneId).lean();
        const isOwner = stone.owner == req.user?._id;
        const userLiked = stone.likedList.push(req.user._id);
        await stoneService.edit(stoneId, stone); 

        res.render('stone/details', { stone, isOwner, userLiked });
    } catch (err) {
        res.render('404');
    }
});

router.get('/stones/:stoneId/delete', isAuth, async (req, res) => {
    try {
        await stoneService.delete(req.params.stoneId);

        res.redirect('/dashboard');
    } catch (err) {
        res.render('/');

    }
});

router.get('/stones/:stoneId/edit', isAuth, async (req, res) => {
    try {
        const stone = await stoneService.getOne(req.params.stoneId).lean();

        res.render('stone/edit', { ...stone });
    } catch (err) {
        res.render('/');

    }
});

router.post('/stones/:stoneId/edit', isAuth, async (req, res) => {
    const editedStone = req.body; 

    try {
        await stoneService.edit(req.params.stoneId, editedStone);

        res.redirect(`/stones/${req.params.stoneId}`);
    } catch (err) {
        res.render('/');

    }
});


module.exports = router;
