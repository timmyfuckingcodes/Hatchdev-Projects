
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('applications', {
      application_Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    job_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'job', // name of Target model
            key: 'job_Id', // key in Target model that we're referencing
        },

    },
    jobseeker_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'jobseeker', // name of Target model
            key: 'jobseeker_Id', // key in Target model that we're referencing
        },
     
    },
resume_url:{
        type: Sequelize.STRING,
        allowNull: false,
},
cover_letter: {
        type: Sequelize.TEXT,
        allowNull: true,
},
applied_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
},
    status: {
        type: Sequelize.ENUM("Applied", "Under Review", "Interview Scheduled", "Offered", "Rejected"),
        allowNull: false,
        defaultValue: "Applied",
    },
    reviewed_at: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    notes: {
        type: Sequelize.TEXT,
        allowNull: true,
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
},
    );
    
  },



  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Applications');
  }
};
