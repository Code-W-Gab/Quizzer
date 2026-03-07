import express from 'express'

import { Register, Login, GetUserById, GetUser} from '../controllers/auth/userController.mjs';
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login)
router.get('/', GetUser)
router.get("/:id", GetUserById)

export default router;