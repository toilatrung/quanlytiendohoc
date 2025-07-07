// lib/loadExcel.ts
import tasks from "@/data/tasks.json";

export function loadTasksFromExcel() {
  return tasks.map((task: any, index: number) => ({
    id: index,
    name: task["Task"] || `Task ${index}`,
    deadline: task["Deadline"],
    status: task["Status"] || "Waiting",
    user: task["User"],
  }));
}
