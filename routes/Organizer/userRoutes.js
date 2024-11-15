import {Router} from 'express'
const router = Router()

import { getCurrentUser } from '../../controller/Organizer/userController.js'
import { authenticateUser } from '../../middleware/authMiddleware.js'

router.get('/organizer-current-user', authenticateUser, getCurrentUser)

export default router