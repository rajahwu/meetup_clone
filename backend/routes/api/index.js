const router = require('express').Router();
const sessonRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth');

router.use(restoreUser);

router.use('/session', sessonRouter);

router.use('/users', usersRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body })
});

//GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user })
});


// GET /api/restore-user
router.get('/restore-user', (req, res) => {
        return res.json(req.user)
    }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth');
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user)
})

module.exports = router;