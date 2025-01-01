const uploadImage = require('./services/uploadService');
const db = require('../path_to_your_db_config');


exports.createBook = async (bookData, file) => {
    const { bookName, isPro = false, category, description } = bookData;
    const transaction = await db.sequelize.transaction();
    try {
      let bookImage = null;
      if (file) {
        bookImage = await uploadImage(file);
      }
  
      const book = await db.book.create(
        {
          bookName,
          bookImage,
          isPro,
          category,
        },
        { transaction }
      );
  
      if (description) {
        await db.description.create(
          {
            bookId: book.bookId,
            description,
          },
          { transaction }
        );
      }
      await transaction.commit();
      return book;
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating book:', error);
      throw new Error('Failed to create book.');
    }
  }
  

  exports.addChapter = async (bookId, chapterData) => {
    const { chapterName, content } = chapterData;
  
    try {
      const book = await db.book.findByPk(bookId);
      if (!book) {
        throw new Error('Book not found.');
      }
  
      const chapter = await db.chapter.create({
        bookId,
        chapterName,
        content,
      });
  
      return chapter;
    } catch (error) {
      console.error('Error adding chapter:', error);
      throw new Error('Failed to add chapter.');
    }
  }

  /**
 * Delete a book and its associated chapters and description.
 */
async function deleteBook(bookId) {
    const transaction = await db.sequelize.transaction();
  
    try {
      // Delete associated chapters and description
      await db.chapter.destroy({ where: { bookId }, transaction });
      await db.description.destroy({ where: { bookId }, transaction });
  
      // Delete the book itself
      const deletedCount = await db.book.destroy({ where: { bookId }, transaction });
  
      if (deletedCount === 0) {
        throw new Error('Book not found.');
      }
  
      await transaction.commit();
      return { message: 'Book deleted successfully.' };
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book.');
    }
  }
  
  /**
   * Delete a specific chapter.
   */
  async function deleteChapter(chapterId) {
    try {
      const deletedCount = await db.chapter.destroy({ where: { chapterId } });
  
      if (deletedCount === 0) {
        throw new Error('Chapter not found.');
      }
  
      return { message: 'Chapter deleted successfully.' };
    } catch (error) {
      console.error('Error deleting chapter:', error);
      throw new Error('Failed to delete chapter.');
    }
  }
  
  /**
   * Edit a book.
   */
  async function editBook(bookId, bookData, file) {
    const transaction = await db.sequelize.transaction();
  
    try {
      let bookImage = null;
      if (file) {
        bookImage = await uploadImage(file);
      }
  
      const [updatedCount] = await db.book.update(
        {
          ...bookData,
          bookImage,
        },
        { where: { bookId }, transaction }
      );
  
      if (updatedCount === 0) {
        throw new Error('Book not found.');
      }
  
      if (bookData.description) {
        await db.description.upsert(
          {
            bookId,
            description: bookData.description,
          },
          { transaction }
        );
      }
  
      await transaction.commit();
      return { message: 'Book updated successfully.' };
    } catch (error) {
      await transaction.rollback();
      console.error('Error editing book:', error);
      throw new Error('Failed to edit book.');
    }
  }
  
  /**
   * Edit a chapter.
   */
  async function editChapter(chapterId, chapterData) {
    try {
      const [updatedCount] = await db.chapter.update(
        { ...chapterData },
        { where: { chapterId } }
      );
  
      if (updatedCount === 0) {
        throw new Error('Chapter not found.');
      }
  
      return { message: 'Chapter updated successfully.' };
    } catch (error) {
      console.error('Error editing chapter:', error);
      throw new Error('Failed to edit chapter.');
    }
  }