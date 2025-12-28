import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import Bookmark from "../models/bookmark";
import Job from "../models/job";
import Jobseeker from "../models/jobseeker";

const router = express.Router();

// Create bookmark
router.post("/:jobid", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { jobid:job_Id} = req.params;
    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can bookmark jobs"
        });
    }

    try {
        // Get jobseeker_Id from user_Id
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        // Check if job exists
        const job = await Job.findByPk(job_Id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Check if already bookmarked
        const existingBookmark = await Bookmark.findOne({
            where: {
                job_Id,
                jobseeker_Id: jobseeker.jobseeker_Id
            }
        });

        if (existingBookmark) {
            return res.status(409).json({
                message: "Job already bookmarked"
            });
        }

        const bookmark = await Bookmark.create({
            job_Id,
            jobseeker_Id: jobseeker.jobseeker_Id
        });

        return res.status(201).json({
            message: "Job bookmarked successfully",
            bookmark
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get user's bookmarks
router.get("/", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can view bookmarks"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const bookmarks = await Bookmark.findAll({
            where: { jobseeker_Id: jobseeker.jobseeker_Id },
            include: [{
                model: Job,
                as: 'job'
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Bookmarks retrieved successfully",
            bookmarks
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Remove bookmark
router.delete("/:job_Id", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { job_Id } = req.params;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can remove bookmarks"
        });
    }

    try {
        const jobseeker = await Jobseeker.findOne({ where: { user_Id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const bookmark = await Bookmark.findOne({
            where: {
                job_Id: parseInt(job_Id),
                jobseeker_Id: jobseeker.jobseeker_Id
            }
        });

        if (!bookmark) {
            return res.status(404).json({
                message: "Bookmark not found"
            });
        }

        await bookmark.destroy();

        return res.status(200).json({
            message: "Bookmark removed successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;