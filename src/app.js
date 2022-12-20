import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import recipeRoutes from "./routes/recipts.js";
import sequilize from "./config/index.js";
import { Category } from "./models/recipts.js";
import schedule from "node-schedule";
import { generateCategoryReport } from './utils/index.js'

const swaggerDocument = YAML.load('./docs/docs.yml');

// This scheduler will run every 5 min. change it to 0 0 1 * * to run every month
schedule.scheduleJob("*/1 * * * *", async () => {
  const filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(filename)
  const path = join(__dirname, '..', 'public')
  try{
    await generateCategoryReport(path)
  }
  catch(err){
    console.log("Error While Generating Report", err)
  }
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));
app.use("/api/recipts", recipeRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
sequilize
  .sync()
  .then(() => {
    return Category.bulkCreate([
      {
        name: "Entertainment",
      },
      {
        name: "Transport",
      },
      {
        name: "Groceries",
      },
      {
        name: "Shopping",
      },
      {
        name: "Other",
      },
    ]);
  })
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log("Error: ", err));
const PORT = process.env["SERVER_PORT"] || 8080;
app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
