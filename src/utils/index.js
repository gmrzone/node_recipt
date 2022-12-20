import { promises } from "fs";
import { QueryTypes } from 'sequelize';
import { join } from "path";
import sequilize from "../config/index.js";

export const convertToCSV = (arr) => {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join("\n");
};
export const generateCategoryReport = async (filePath) => {
  const fileName = "category_report_" + new Date().toISOString() + ".csv";
  const fullFilePath = join(filePath, fileName);
  const data = await sequilize.query(
    `SELECT c.name, round(sum(r.cost) * 100 / (SELECT sum(cost) from public.recipts), 2) as cpercent
      FROM public.categories c JOIN public.recipts r  ON r."categoryId" = c.id GROUP BY c.name;`,
    QueryTypes.SELECT
  );
  const csvData = convertToCSV(data[0]);
  await promises.writeFile(fullFilePath, csvData);
};
