module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('students', 'created_at', {
                type: Sequelize.DATE,
            }),
            queryInterface.addColumn('students', 'updated_at', {
                type: Sequelize.DATE,
            }),
        ]);
    },

    down: queryInterface => {
        return Promise.all([
            queryInterface.removeColumn('students', 'created_at'),
            queryInterface.removeColumn('students', 'updated_at'),
        ]);
    },
};
