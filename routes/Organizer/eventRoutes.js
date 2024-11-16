import {Router} from 'express'
import { authenticateUser } from '../../middleware/authMiddleware.js'
import { eventSubmit } from '../../controller/Organizer/eventController.js'


const router = Router()

router.post(
    '/host-a-event',
    authenticateUser,
    eventSubmit
);

export default router