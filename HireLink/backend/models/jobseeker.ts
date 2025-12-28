import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Jobseeker extends Model {
   jobseeker_Id!: number;
   user_Id!: number;
   full_name!: string;
   phone!: string;
   profile_summary!: string;
}

Jobseeker.init(
    {
        // Model attributes are defined 
        jobseeker_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },

        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profile_summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "  Jobseeker", // We need to choose the model name
      timestamps: true,
     tableName: "jobseeker"
  }
);

export default Jobseeker;