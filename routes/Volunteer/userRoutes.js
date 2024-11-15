import {Router} from 'express'
const router = Router()

import { getCurrentUser } from '../../controller/Volunteer/userController.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'

router.get('/volunteer-current-user', authenticateUser, getCurrentUser)

export default router