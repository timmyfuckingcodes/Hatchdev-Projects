import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import Application from "../models/application";
import Job from "../models/job";
import Jobseeker from "../models/jobseeker";

const router = express.Router();

// Create application
// router.post("/", authenticate, async (req: Request, res: Response) => {
//     const { id, role } = req.user;
//     const { job_Id } = req.body;

//     if (role !== "jobseeker") {
//         return res.status(403).json({
//             message: "Forbidden: Only jobseekers can apply for jobs"
//         });
//     }

//     try {
//         const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
//         if (!jobseeker) {
//             return res.status(404).json({
//                 message: "Jobseeker profile not found"
//             });
//         }

//         const job = await Job.findByPk(job_Id);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         const existingApplication = await Application.findOne({
//             where: {
//                 job_Id,
//                 jobseeker_Id: jobseeker.jobseeker_Id
//             }
//         });

//         if (existingApplication) {
//             return res.status(409).json({
//                 message: "Already applied for this job"
//             });
//         }

//         const application = await Application.create({
//             job_Id,
//             jobseeker_Id: jobseeker.jobseeker_Id
//         });

//         return res.status(201).json({
//             message: "Application submitted successfully",
//             application
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error",
//             error
//         });
//     }
// });

// Create application
router.post("/:job_Id", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { job_Id } = req.params;
    const{ resume_url, cover_letter,notes} = req.body;
    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can apply for jobs"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const job = await Job.findByPk(job_Id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            where: {
                job_Id,
                jobseeker_Id: jobseeker.jobseeker_Id
            }
        });

        if (existingApplication) {
            return res.status(409).json({
                message: "Already applied for this job"
            });
        }

        const application = await Application.create({
            job_Id: job_Id,
           jobseeker_Id: jobseeker.jobseeker_Id,
            resume_url,
            cover_letter,
            notes
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});


// Get applications for a job (employer)
router.get("/job/:jobId", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { jobId } = req.params;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view job applications"
        });
    }

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_Id !== id) {
            return res.status(403).json({
                message: "Forbidden: You can only view applications for your own jobs"
            });
        }

        const applications = await Application.findAll({
            where: { job_Id: jobId },
            include: [{
                model: Jobseeker,
                as: 'jobseeker'
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Applications retrieved successfully",
            applications
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get user's applications (jobseeker)
router.get("/my-applications", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can view their applications"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const applications = await Application.findAll({
            where: { jobseeker_Id: jobseeker.jobseeker_Id },
            include: [{
                model: Job,
                as: 'job'
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Applications retrieved successfully",
            applications
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

//Get Recent applications for dashboard (jobseeker)

// Update application status (employer)
router.put("/:applicationId/status", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { applicationId } = req.params;
    const { status } = req.body;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update application status"
        });
    }

    try {
        const application = await Application.findByPk(applicationId, {
            include: [{
                model: Job,
                as: 'job'
            }]
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        if (application.job.employer_Id !== id) {
            return res.status(403).json({
                message: "Forbidden: You can only update applications for your own jobs"
            });
        }

        await application.update({ status });

        return res.status(200).json({
            message: "Application status updated successfully",
            application
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;


