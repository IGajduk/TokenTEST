const tableName = 'user';

const foreignKeys = {
};

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(tableName, {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        // name: DataTypes.STRING,
        // surname: DataTypes.STRING,
        // role: DataTypes.STRING
    }, {});
    //
    // User.associate = function (models) {
    //     User.belongsToMany(models.city, {through: models.city_manager, foreignKey: foreignKeys.city});
    // };

    User.tableName = tableName;

    User.notUpdatableFields = [];
    User.requiredFileds = [
        'login',
        'password',
        'name',
        'surname',
        'role'
    ];

    return User;
};

