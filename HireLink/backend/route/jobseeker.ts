import express ,{Request, Response}from "express";
import  Employer from "../models/employer";
import  User  from "../models/user";
import { authenticate } from "../middleware/auth";
import Jobseeker from "../models/jobseeker";

const router = express.Router();

router.post("/profile",authenticate, async (req: Request, res: Response) => {
    const {id,role} = req.user;
    const user_Id = id;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseeker can create profiles"
        });
    }

      // Check if user_Id exists in Users table
      const user = await User.findByPk(user_Id);
       
      if (!user) {
          return res.status(404).json({
              message: "User not found"
          });
      }
    
      const {phone,profile_summary} = req.body;

    try {
       const full_name = user.firstName + " " + user.lastName;
 // Create Jobseeker profile
const newJobseeker = await  Jobseeker.create({
            user_Id,
            full_name,
            phone,
            profile_summary
        });

        return res.status(201).json({
            message: "Employer profile created successfully",
            employer: newJobseeker
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});





// Get jobseeker profile
router.get("/profile", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can view their profile"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ 
            where: { user_Id: id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['email', 'firstName', 'lastName']
            }]
        });

        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        return res.status(200).json({
            message: "Jobseeker profile retrieved successfully",
            jobseeker
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Update jobseeker profile
router.put("/profile", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can update their profile"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        await jobseeker.update(req.body);

        return res.status(200).json({
            message: "Jobseeker profile updated successfully",
            jobseeker
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;