const userRouter = require('express').Router();

const { userInfoValidation } = require('../middlewares/celebrateValidation');
const { getCurrentUserInfo, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', userInfoValidation, updateUserInfo);

module.exports = userRouter;
