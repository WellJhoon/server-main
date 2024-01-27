import server from "./app.js";
import { sequelize } from "./database/database.js";

import './models/Project.js'
import './models/User.js'
import './models/Task.js'

async function main() {
  try {
    await sequelize.sync()
    console.log("Connection established")
    server.listen(3000);
    console.log("Server on port 3000");
  } catch (e) {
    console.log(e);
  }
}

main();
