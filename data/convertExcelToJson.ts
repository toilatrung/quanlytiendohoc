import fs from "fs";
import path from "path";
import xlsx from "xlsx";

const workbook = xlsx.readFile("Road to WebDev.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

// Đảm bảo thư mục data tồn tại
const outputDir = path.join(__dirname, "data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Ghi file JSON
fs.writeFileSync(path.join(outputDir, "tasks.json"), JSON.stringify(data, null, 2));
console.log("✅ tasks.json đã được tạo tại /data/tasks.json");
