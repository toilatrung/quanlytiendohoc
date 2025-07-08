'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Hàm chuyển số ngày Excel -> chuỗi ngày yyyy-MM-dd
function excelDateToISO(excelDate: number): string {
  const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
  return jsDate.toISOString().split("T")[0];
}

interface Task {
  stt: number;
  typescript: string;
  react: string;
  deadline: string; // yyyy-MM-dd
  process: string;
  note?: string;
}

const users = ["troycourselab-minhmaster", "troycourselab-vanh"];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setSelectedUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    fetch("/api/tasks")
      .then((res) => res.json())
      .then((allTasks: any[]) => {
        // Chuẩn hóa dữ liệu, convert deadline
        const tasks: Task[] = allTasks.map((item) => ({
          stt: Number(item.STT),
          typescript: item.TypeScript,
          react: item.React,
          deadline: excelDateToISO(Number(item.Deadline)),
          process: item.Process,
          note: item.Note || "",
        }));
        setTasks(tasks);
      });
  }, [selectedUser]);

  const handleLogin = (user: string) => {
    localStorage.setItem("loggedUser", user);
    setSelectedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setSelectedUser(null);
    setTasks([]);
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project Progress Tracker</h1>
      {!selectedUser ? (
        <div className="space-y-2">
          <h2 className="text-lg">Đăng nhập người dùng:</h2>
          {users.map((user) => (
            <Button key={user} onClick={() => handleLogin(user)}>{user}</Button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Xin chào, {selectedUser}</h2>
            <Button variant="destructive" onClick={handleLogout}>Đăng xuất</Button>
          </div>
          <Card>
            <CardContent className="overflow-auto p-4">
              <h2 className="text-lg font-semibold mb-2">Tiến độ công việc</h2>
              <table className="w-full border text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">STT</th>
                    <th className="p-2 border">TypeScript</th>
                    <th className="p-2 border">React</th>
                    <th className="p-2 border">Deadline</th>
                    <th className="p-2 border">Process</th>
                    <th className="p-2 border">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.stt}>
                      <td className="p-2 border">{task.stt}</td>
                      <td className="p-2 border" style={{whiteSpace:"pre-line"}}>{task.typescript}</td>
                      <td className="p-2 border" style={{whiteSpace:"pre-line"}}>{task.react}</td>
                      <td className="p-2 border">{format(new Date(task.deadline), "d-MMM")}</td>
                      <td className="p-2 border">{task.process}</td>
                      <td className="p-2 border">{task.note || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}