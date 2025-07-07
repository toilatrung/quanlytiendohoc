import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const { id, newStatus } = await req.json();

  const filePath = path.join(process.cwd(), "public", "Road to WebDev.xlsx");
  const fileBuffer = readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const updatedData = jsonData.map((row: any, index: number) => {
    if (index + 1 === id) {
      return {
        ...row,
        Status: newStatus,
      };
    }
    return row;
  });

  const updatedSheet = XLSX.utils.json_to_sheet(updatedData);
  workbook.Sheets[sheetName] = updatedSheet;
  XLSX.writeFile(workbook, filePath);

  return NextResponse.json({ success: true });
}