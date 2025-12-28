import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Employer extends Model {
   employer_Id!: number;
    user_Id!: number;
    company_name!: string;
    company_description!: string;
    company_email!: string;
}

Employer.init(
    {
        // Model attributes are defined 
        employer_Id: {
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
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        company_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "Employer", // We need to choose the model name
      timestamps: true,
     tableName: "employer"
  }
);

export default Employer;