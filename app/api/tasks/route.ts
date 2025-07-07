import { NextResponse } from 'next/server';
import { loadTasksFromExcel } from '@/lib/loadExcel';

export async function GET() {
  try {
    const tasks = loadTasksFromExcel();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error loading Excel tasks:', error);
    return NextResponse.json({ error: 'Failed to load tasks' }, { status: 500 });
  }
}