const { Sequelize } = require("sequelize");
const { dbName, dbConfig } = require("../config/config.json");

module.exports = db = {};
initialize();

async function initialize() {
  const dialect = "mysql";
  const host = dbConfig.server;

  const { username, password } = dbConfig.authentication.options;

  const sequelize = new Sequelize(dbName, username, password, {
    host,
    dialect,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // Define models
  db.user = require("../modals/users.modals")(sequelize, Sequelize);
  db.book = require("../modals/app/quick_reads/book.modal")(sequelize, Sequelize);
  db.description = require("../modals/app/quick_reads//description.modal")(sequelize, Sequelize);
  db.chapter = require('../modals/app/quick_reads/chapters.modal')(sequelize, Sequelize);

  // Associations (if any)
  if (db.user.associate) db.user.associate(db);
  if (db.book.associate) db.book.associate(db);
  if (db.chapter.associate) db.chapter.associate(db);
  if (db.description.associate) db.description.associate(db);

  // Attach Sequelize instance
  db.sequelize = sequelize;

  // Sync models with the database
  await sequelize.sync({ alter: true });
}
