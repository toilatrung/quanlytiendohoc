import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data/tasks.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const tasks = JSON.parse(data);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error reading tasks.json:', error);
    return NextResponse.json({ error: 'Failed to load tasks' }, { status: 500 });
  }
}
