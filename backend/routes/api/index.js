const router = require('express').Router();

const sessonRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const eventsRouter = require('./events.js');
const venuesRouter = require('./venues.js');
const imagesRouter = require('./images.js');

const testRouter = require('./test.js');

const { restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth');

router.use('/testing', testRouter)

router.get('test', requireAuth, (req, res) => {
    res.json({message: 'success'})
})

router.use('/session', sessonRouter);

router.use('/users', usersRouter);

router.use('/groups', groupsRouter);

router.use('/events', eventsRouter);

router.use('/venues', venuesRouter);

router.use('/', imagesRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body })
});

router.use(restoreUser);

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
router.get('/restore-user', restoreUser, (req, res) => {
        return res.json(req.user)
    }
);

// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user)
})

module.exports = router;