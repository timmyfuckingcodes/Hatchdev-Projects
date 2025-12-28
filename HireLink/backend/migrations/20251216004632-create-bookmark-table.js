
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('bookmarks', {
      bookmark_Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      job_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'job',
          key: 'job_Id',
        },
      },
      jobseeker_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'jobseeker',
          key: 'jobseeker_Id',
        },
      },
      createdAt: {
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
    await queryInterface.dropTable('bookmarks');
  }
};