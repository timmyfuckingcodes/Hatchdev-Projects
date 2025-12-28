import sequelize from "../config/sequelize";
import User from "./user";
import Employer from "./employer";
import Bookmark from "./bookmark";
import Application from "./application";
import Job from "./job";
import Jobseeker from "./jobseeker";

const models = {
  User,
  Employer,
  Bookmark,
  Application,
  Job,
  Jobseeker,
};

// Define associations
// User associations
User.hasOne(Employer, { foreignKey: 'user_Id', as: 'employer' });
Employer.belongsTo(User, { foreignKey: 'user_Id', as: 'user' });

User.hasOne(Jobseeker, { foreignKey: 'user_Id', as: 'jobseeker' });
Jobseeker.belongsTo(User, { foreignKey: 'user_Id', as: 'user' });

// Employer-Job associations
Employer.hasMany(Job, { foreignKey: 'employer_Id', as: 'jobs' });
Job.belongsTo(Employer, { foreignKey: 'employer_Id', as: 'employer' });

// Job-Bookmark associations
Job.hasMany(Bookmark, { foreignKey: 'job_Id', as: 'bookmarks' });
Bookmark.belongsTo(Job, { foreignKey: 'job_Id', as: 'job' });

Jobseeker.hasMany(Bookmark, { foreignKey: 'jobseeker_Id', as: 'bookmarks' });
Bookmark.belongsTo(Jobseeker, { foreignKey: 'jobseeker_Id', as: 'jobseeker' });

// Job-Application associations
Job.hasMany(Application, { foreignKey: 'job_Id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_Id', as: 'job' });

Jobseeker.hasMany(Application, { foreignKey: 'jobseeker_Id', as: 'applications' });
Application.belongsTo(Jobseeker, { foreignKey: 'jobseeker_Id', as: 'jobseeker' });

export { sequelize };
export default models;
