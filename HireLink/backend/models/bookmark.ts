import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Job from "./job";
import JobSeeker from "./jobseeker";

class Bookmark extends Model {
    bookmark_Id!: number;
    job_Id!: number;
    jobseeker_Id!: number;
    createdAt!: Date;
}

Bookmark.init(
    {
        bookmark_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        job_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'job',
                key: 'job_Id',
            },
        },
        jobseeker_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jobseeker',
                key: 'jobseeker_Id',
            },
        },
    },
    {
        sequelize,
        modelName: "Bookmark",
        timestamps: true,
        updatedAt: false,
        tableName: "bookmarks"
    }
);
Bookmark.belongsTo(Job, {
    foreignKey: "job_Id",
    as: "job",
  });
Job.hasMany(Bookmark, { foreignKey: "job_Id" });

Bookmark.belongsTo(JobSeeker, { foreignKey: "jobseeker_Id" });
JobSeeker.hasMany(Bookmark, { foreignKey: "jobseeker_Id" });
export default Bookmark;