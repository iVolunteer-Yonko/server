import Organizer from '../../models/OrganizerModel.js'
import { UnauthenticatedError } from '../../errors/custumErrors.js';
import { hashpassword, comparePassword } from '../../utils/passwordUtils.js';
import { createToken } from '../../utils/tokenUtils.js';

export const Signup = async (req, res) => {
    try{
        let { name, email, password, typeoforg, website, about, role } = req.body;
      
        const hashedPassword = await hashpassword(password)
        password = hashedPassword
      
        const organizer = await Organizer.create({ name, email, password, typeoforg, website, about, role });
        res.status(201).json({ msg : organizer});
      
    } catch(error) {
        console.log(error)
        res.status(500).json({msg : 'Something went wrong'})
    }
} 

export const Login = async (req, res, next) => {
    try {
        const organizer = await Organizer.findOne({ email: req.body.email });
  
        const isValid = organizer && (await comparePassword(req.body.password, organizer.password))
  
        if (!isValid) {
          throw new UnauthenticatedError('Invalid credentials');
        }
  
        const token = createToken({userID : organizer._id, role : organizer.role})
        
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

