'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('job', {
      job_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      employer_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employer',
          key: 'employer_Id',
        },
      },
     title: {
        type: Sequelize.STRING,
        allowNull: false,
     },
     company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     description:{
        type: Sequelize.TEXT,
        allowNull: false,
     },
     location: {
        type: Sequelize.STRING,
        allowNull: false,
     },
     job_type: {
        type: Sequelize.ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'),
        allowNull: false,
    },
     salary_min: {
        type: Sequelize.DECIMAL,
        allowNull: true,
     },
      salary_max: {
          type: Sequelize.DECIMAL,
          allowNull: true,
      },
      location_type:{
        type: Sequelize.ENUM('On-site','Remote','Hybrid'),
        allowNull: false,
      },
      requirements:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isACTIVE:{
        type:Sequelize.ENUM('Open','Closed'),
        allowNull:false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('job');
  }
};
