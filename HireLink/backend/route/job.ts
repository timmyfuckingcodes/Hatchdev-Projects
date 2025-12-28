import express ,{Request, Response}from "express";
import  User  from "../models/user";
import { authenticate } from "../middleware/auth";
import Job from "../models/job";
import { Op } from "sequelize";
import Employer from "../models/employer";


const router = express.Router();

// Create job
router.post("/", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can create jobs"
        });
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
  
    const employer_Id = await Employer.findOne({ where: { user_Id: id } });
   
    const { title, description, location, job_type, salary_min, salary_max, location_type, requirements, isACTIVE } = req.body;

    try {
        const newJob = await Job.create({
            employer_Id: employer_Id?.employer_Id,
            title,
            company_name: employer_Id?.company_name,
            description,
            location,
            job_type,
            salary_min,
            salary_max,
            location_type,
            requirements,
            isACTIVE: isACTIVE || "Open"
        });

        return res.status(201).json({
            message: "Job created successfully",
            job: newJob
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get all jobs
router.get("/", async (req: Request, res: Response) => {
    try {
        const jobs = await Job.findAll({
            where: { isACTIVE: "Open" },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get job by ID
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const job = await Job.findByPk(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({
            message: "Job retrieved successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Update job
router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const { id } = req.params;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update jobs"
        });
    }

    try {
        const job = await Job.findByPk(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_Id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only update your own jobs"
            });
        }

        await job.update(req.body);

        return res.status(200).json({
            message: "Job updated successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Delete job
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const { id } = req.params;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can delete jobs"
        });
    }

    try {
        const job = await Job.findByPk(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_Id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only delete your own jobs"
            });
        }

        await job.destroy();

        return res.status(200).json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});





// Search jobs
router.get("/search", async (req: Request, res: Response) => {
    const { title, location, job_type, salary_min, salary_max } = req.query;

    try {
        const whereClause: any = { isACTIVE: "Open" };

        if (title) {
            whereClause.title = { [Op.iLike]: `%${title}%` };
        }
        if (location) {
            whereClause.location = { [Op.iLike]: `%${location}%` };
        }
        if (job_type) {
            whereClause.job_type = job_type;
        }
        if (salary_min) {
            whereClause.salary_min = { [Op.gte]: parseInt(salary_min as string) };
        }
        if (salary_max) {
            whereClause.salary_max = { [Op.lte]: parseInt(salary_max as string) };
        }

        const jobs = await Job.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get jobs by employer
router.get("/employer/:employerId", async (req: Request, res: Response) => {
    const { employerId } = req.params;

    try {
        const jobs = await Job.findAll({
            where: { 
                employer_Id: employerId,
                isACTIVE: "Open"
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Employer jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get my jobs (authenticated employer)
router.get("/my-jobs", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view their jobs"
        });
    }

    try {
        const jobs = await Job.findAll({
            where: { employer_Id: id },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Your jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
//patch to update job status
router.patch("/status/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const { id } = req.params;
    const { isACTIVE } = req.body;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update job status"
        });
    }

    try {
        const job = await Job.findByPk(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_Id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only update your own jobs"
            });
        }

        job.isACTIVE=isACTIVE;
        await job.save();

        return res.status(200).json({
            message: "Job status updated successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
}
});

export default router;