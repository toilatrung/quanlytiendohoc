import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import path from 'path';

export interface TaskFromExcel {
  id: number;
  name: string;
  deadline: string;
  status: string;
  user: string;
}

export function loadTasksFromExcel(): TaskFromExcel[] {
  const filePath = path.join(process.cwd(), 'public', 'Road to WebDev.xlsx');
  const fileBuffer = readFileSync(filePath);

  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json(sheet);

  const tasks: TaskFromExcel[] = rawData.map((row: any, index) => ({
    id: index + 1,
    name: row['Task'] || row['Tên công việc'] || `Task ${index + 1}`,
    deadline: XLSX.SSF.parse_date_code(row['Deadline'] || row['Hạn'] || ''),
    status: row['Status'] || row['Trạng thái'] || 'Waiting',
    user: row['User'] || row['Người dùng'] || 'troycourselab-minhmaster',
  }));

  re