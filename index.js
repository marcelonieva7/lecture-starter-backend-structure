const express = require("express");
const knex = require("knex");
const { Model } = require("objection");
const dbConfig = require("./knexfile");
const { initRoutes } = require("./src/routes/routes");
const { startStatsListeners } = require("./src/events/events");

const db = knex(dbConfig.development);
Model.knex(db);

const app = express();
app.use(express.json());
initRoutes(app);

const port = 4066;
const server = app.listen(port, async () => {
  try {
    await db.raw('select 1+1 as result')
    console.log('Connected to db');
    startStatsListeners();
    console.log(`App listening at http://localhost:${port}`);
  } catch {
    console.error('No db connection');
  }
});

// Do not change this line
module.exports = { app, server };
