import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

function excelDateToISO(excelDate: number): string {
  const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
  return jsDate.toISOString().split("T")[0];
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data/tasks.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const tasksRaw = JSON.parse(data);

    // Chuẩn hóa dữ liệu: Đổi tên fields và convert deadline
    const tasks = tasksRaw.map((item: any) => ({
      stt: Number(item.STT),
      typescript: item.TypeScript,
      react: item.React,
      deadline: excelDateToISO(Number(item.Deadline)),
      process: item.Process,
      note: item.Note || "",
    }));

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error reading tasks.json:', error);
    return NextResponse.json({ error: 'Failed to load tasks' }, { status: 500 });
  }
}