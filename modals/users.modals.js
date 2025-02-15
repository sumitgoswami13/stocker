module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      'User',
      {
        userId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userEmail: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true,
        },
        joinedOn: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        loginType: {
          type: Sequelize.ENUM('google', 'email'),
          defaultValue: 'email',
          allowNull: false,
        },
        is_Premium: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        premium_joined_data: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        type:{
          type: Sequelize.ENUM('admin', 'user'),
          defaultValue: 'user',
          allowNull: false,
        },
        referesh_token:{
          type: Sequelize.STRING,
          allowNull: true,
        }
      },
      {
        tableName: 'Users',
        timestamps: false, 
      }
    );
  };
  