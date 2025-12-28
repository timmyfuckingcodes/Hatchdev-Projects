import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Job extends Model {
   job_Id!: number;
   employer_Id!: number;
    title!: string;
    company_name!: string;
    description!: string;
    location!: string;
    job_type!: "Full-time" | "Part-time" | "Remote" | "Contract"| "Internship"|"Temporary";
    salary_min!: number;
    salary_max!: number;
    location_type!:"On-site" | "Remote" | "Hybrid";
    requirements!: string;
    isACTIVE!: "Open" | "Closed";
    

}

Job.init(
    {
        // Model attributes are defined 
        job_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        employer_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employer', // name of Target model
                key: 'employer_Id', // key in Target model that we're referencing
            },

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_type: {
            type: DataTypes.ENUM("Full-time", "Part-time", "Remote", "Contract", "Internship"),
            allowNull: false,
        },
        salary_min: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salary_max: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isACTIVE: {
            type: DataTypes.ENUM("Open", "Closed"),
            allowNull: false,
        },
        
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "Job", // We need to choose the model name
      timestamps: true,
     tableName: "job"
  }
);

export default Job;