module.exports = (sequelize, Sequelize) => {
    const BookDescription = sequelize.define(
      'BookDescription',
      {
        descriptionId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        bookId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Books', // References the Books table
            key: 'bookId',
          },
          onDelete: 'CASCADE', // Deletes the description if the associated book is deleted
        },
        description: {
          type: Sequelize.TEXT, // Allows large amounts of text for the summary
          allowNull: false,
        },
      },
      {
        tableName: 'BookDescriptions',
        timestamps: false, // Disables automatic createdAt and updatedAt columns
      }
    );
  
    // Define associations
    BookDescription.associate = (db) => {
      BookDescription.belongsTo(db.book, { foreignKey: 'bookId', as: 'book' });
    };
  
    return BookDescription;
  };
  