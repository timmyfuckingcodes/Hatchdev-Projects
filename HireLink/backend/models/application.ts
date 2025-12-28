import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Job from "./job";
import JobSeeker from "./jobseeker";

class Application extends Model {
   application_Id!: number;
    job_Id!: number;
    jobseeker_Id!: number;
    resume_Id!: number;
    status!: "Applied" | "Under Review" | "Interview Scheduled" | "Offered" | "Rejected";
    applied_at!: Date;
}

Application.init(
    {
        // Model attributes are defined 
        application_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        job_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'job', // name of Target model
                key: 'job_Id', // key in Target model that we're referencing
            },

        },
        jobseeker_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jobseeker', // name of Target model
                key: 'jobseeker_Id', // key in Target model that we're referencing
            },
         
        },
        resume_url: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          cover_letter:{
            type: DataTypes.TEXT,
            allowNull: true,
          },
          applied_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        status: {
            type: DataTypes.ENUM("Applied", "Under Review", "Interview Scheduled", "Offered", "Rejected"),
            defaultValue: "Applied",
            allowNull: false,
        },
        reviewed_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "Application", // We need to choose the model name
      timestamps: true,
     tableName: "applications"
  }

);
// Define associations
// Associations
Application.belongsTo(Job, {
    foreignKey: "job_Id",
    as: "job",
  });
Job.hasMany(Application, { foreignKey: "job_Id" });

Application.belongsTo(JobSeeker, { foreignKey: "jobseeker_Id" });
JobSeeker.hasMany(Application, { foreignKey: "jobseeker_Id" });

export default Application;



