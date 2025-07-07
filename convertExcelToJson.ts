import fs from "fs";
import xlsx from "xlsx";

const workbook = xlsx.readFile("Road to WebDev.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync("data/tasks.json", JSON.stringify(data, null, 2));
console.log("✅ Đã convert xong sang data/tasks.json");
