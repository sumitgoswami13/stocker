module.exports = (sequelize, Sequelize) => {
    const Chapter = sequelize.define(
      'Chapter',
      {
        chapterId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        chapterName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bookId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Books', // References the Books table
            key: 'bookId',
          },
          onDelete: 'CASCADE', // Deletes chapters if the associated book is deleted
        },
        content: {
          type: Sequelize.TEXT, // For storing HTML-structured content
          allowNull: false,
        },
      },
      {
        tableName: 'Chapters',
        timestamps: false, // Disables automatic createdAt and updatedAt columns
      }
    );
  
    // Define the associations outside of the return statement
    Chapter.associate = (db) => {
      Chapter.belongsTo(db.book, { foreignKey: 'bookId', as: 'book' });
    };
  
    return Chapter;
  };
  