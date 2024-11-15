import {Router} from 'express'
import { Login, Logout, Signup } from '../../controller/Volunteer/authController.js'
import { validateLoginCredentials, validateSignupCredentials } from '../../middleware/Organizer/validationMiddleware.js'
const router = Router()

router.post('/volunteer-signup', validateSignupCredentials,Signup)
router.post('/volunteer-login', validateLoginCredentials, Login)
router.get('/volunteer-logout', Logout)


export default router
