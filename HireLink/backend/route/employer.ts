import express ,{Request, Response}from "express";
import  Employer from "../models/employer";
import  User  from "../models/user";
import { authenticate } from "../middleware/auth";

const router = express.Router();


router.post("/profile",authenticate, async (req: Request, res: Response) => {
    const {id,role} = req.user;
    const user_Id = id;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can create profiles"
        });
    }
    
      const { company_name,company_email, company_description} = req.body;
    // Employer profile creation logic goes here
    if ( !company_name || !company_description || !company_email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    try {
       
        // Check if user_Id exists in Users table
        const user = await User.findByPk(user_Id);
       
        if (!user &&  role != req.user.role) {
            return res.status(404).json({
                message: "User not found"
            });
        }

       // Create employer profile
        const newEmployer = await Employer.create({
            user_Id,
            company_name : company_name,
            company_description: company_description,
            company_email: company_email
        });

        return res.status(201).json({
            message: "Employer profile created successfully",
            employer: newEmployer
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});





// Get employer profile
router.get("/profile", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view their profile"
        });
    }

    try {
        const employer = await Employer.findOne({ 
            where: { user_Id: id },
            include: [{
                model: User,
                as: 'user',
                attributes: ['email', 'firstName', 'lastName']
            }]
        });

        if (!employer) {
            return res.status(404).json({
                message: "Employer profile not found"
            });
        }

        return res.status(200).json({
            message: "Employer profile retrieved successfully",
            employer
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Update employer profile
router.put("/profile", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update their profile"
        });
    }

    try {
        const employer = await Employer.findOne({ where: { user_Id: id } });
        
        if (!employer) {
            return res.status(404).json({
                message: "Employer profile not found"
            });
        }

        await employer.update(req.body);

        return res.status(200).json({
            message: "Employer profile updated successfully",
            employer
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;