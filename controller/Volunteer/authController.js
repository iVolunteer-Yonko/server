import Volunteer from '../../models/VolunteerModel.js'
import { UnauthenticatedError } from '../../errors/custumErrors.js';
import { hashpassword, comparePassword } from '../../utils/passwordUtils.js';
import { createToken } from '../../utils/tokenUtils.js';

export const Signup = async (req, res) => {
    try{
        let { username, email, password, role } = req.body;
      
        const hashedPassword = await hashpassword(password)
        password = hashedPassword
      
        const organizer = await Volunteer.create({ username, email, password, role });
        res.status(201).json({ msg : organizer});
      
    } catch(error) {
        console.log(error)
        res.status(500).json({msg : 'Something went wrong'})
    }
} 

export const Login = async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ email: req.body.email });
  
        const isValid = volunteer && (await comparePassword(req.body.password, volunteer.password))
  
        if (!isValid) {
          throw new UnauthenticatedError('Invalid credentials');
        }
  
        const token = createToken({userID : volunteer._id, role : volunteer.role})
        
        const oneDay = 1000 * 60 * 60 * 24
  
        res.cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === 'production'
        })
  
        res.status(200).json({ msg: 'Successfully logged in!' });
    }catch (error) {
        next(error);
    }
} 

export const Logout = async (req, res) => {
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now())
      })
      res.json({msg:'logged out'})
}
