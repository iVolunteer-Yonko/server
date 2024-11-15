import {Router} from 'express'
import { Login, Logout, Signup } from '../../controller/Organizer/authController.js'
import { validateLoginCredentials, validateSignupCredentials } from '../../middleware/Organizer/validationMiddleware.js'
const router = Router()

router.post('/organizer-signup', validateSignupCredentials, Signup)
router.post('/organizer-login', validateLoginCredentials, Login)
router.get('/organizer-logout', Logout)

export default router