import express ,{Request, Response}from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const router = express.Router();

router.post("/register",async(req:Request,res:Response)=>{
    const {firstName, lastName, email, password,role,companyName} = req.body;

    // Registration logic goes here
    if(!firstName || !lastName || !email || !password || !role){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try{
        // const existingUser = await User.findOne({where: {email}});
        // if(existingUser){
        //   return res.status(400).json({
        //     message: "User with this email already exists"
        //   })
        // }
      
         const  hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password :hashedPassword,
          role,
          companyName
           
        });
      
        const editedResponse ={
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      
        return res.status(201).json({
          message: "User registered successfully",
          user: editedResponse
        })
      }catch(error){
        return res.status(500).json({
          message: "Internal server error",
          error: error
        })
      }
      });



router.post("/login",async(req:Request,res:Response)=>{
    const {email, password} = req.body;
 console.log(req.body);
    // Login logic goes here
    if(!email || !password){
        return res.status(400).json({
            message: "Email and password are required"
        })
    }
    try{
        const user = await User.findOne({where: {email}});
        if(!user){
          return res.status(400).json({
            message: "Invalid email or password"
          })
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
          return res.status(400).json({
            message: "Invalid email or password"
          })
        }
      
        const token = jwt.sign(
          {id: user.id, email: user.email, role: user.role},
          process.env.JWT_SECRET as string,
          {expiresIn: "1h"}
        );
      
        return res.status(200).json({
          message: "Login successful",
          token: token,
          role: user.role
        })
      }catch(error){
        console.log(error);
        return res.status(500).json({
          message: "Internal server error",
          error: error
        })
      }
});    

// router.post('/login', async (req, res) => {
//   try {
//     console.log('LOGIN BODY:', req.body);

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Missing email or password' });
//     }

//     const user = await User.findOne({ where: { email } });

//     // 🚨 THIS CHECK SAVES YOUR LIFE
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     return res.status(200).json({
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.error('LOGIN ERROR:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });
//      // either these
// router.post("/login", async (req: Request, res: Response) => {
//   const {email, password} = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//       }
      
//       const user = await User.findOne({ where: { email } })
  
//       if (!user) {
//         return res.status(400).json({ message: "User does not exist" });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
  
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: "Invalid password" });
//       }
  
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
//         expiresIn:  "1d",
//       });
  
//       res.status(200).json({ user: {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       }, token });
//   })
export default router;