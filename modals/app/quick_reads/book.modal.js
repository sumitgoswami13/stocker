module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define(
      'Book',
      {
        bookId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        bookName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bookImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isPro: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'Books',
        timestamps: false, // Disables automatic createdAt and updatedAt columns
      }
    );
  
    // Define the associations outside of the return statement
    Book.associate = (db) => {
      Book.hasMany(db.chapter, { foreignKey: 'bookId', as: 'chapters' });
    };
  
    return Book;
  };
  