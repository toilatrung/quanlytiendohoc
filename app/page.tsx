'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { format, differenceInDays } from "date-fns";

const users = ["troycourselab-minhmaster", "troycourselab-vanh"];

const statuses = [
  "Complete",
  "In process",
  "Delay a day",
  "Waiting",
  "Warning",
];

interface Task {
  id: number;
  name: string;
  deadline: string;
  status: string;
  user: string;
}

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
      .then((allTasks: Task[]) => {
        const userTasks = allTasks.filter((task) => task.user === selectedUser);

        const updated = userTasks.map((task) => {
          const today = new Date();
          const deadlineDate = new Date(task.deadline);

          if (task.status === "Complete") return task;

          const overdueDays = differenceInDays(today, deadlineDate);

          let newStatus = task.status;
          if (overdueDays === 1) newStatus = "Delay a day";
          else if (overdueDays >= 2) newStatus = "Warning";

          if (newStatus !== task.status) {
            sendChangeMail(task.name, task.status, newStatus);
            updateStatus(task.id, newStatus);
          }

          return { ...task, status: newStatus };
        });

        setTasks(updated);
      });
  }, [selectedUser]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id && task.status !== newStatus) {
          sendChangeMail(task.name, task.status, newStatus);
          updateStatus(task.id, newStatus);
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const sendChangeMail = (task: string, oldStatus: string, newStatus: string) => {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "your_email@example.com",
        subject: `Status Change: ${task}`,
        message: `${task} changed from ${oldStatus} to ${newStatus}`,
      }),
    });
  };

  const updateStatus = (id: number, newStatus: string) => {
    fetch("/api/update-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newStatus }),
    });
  };

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
    <main className="p-4 max-w-4xl mx-auto">
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
                    <th className="p-2 border">Tên công việc</th>
                    <th className="p-2 border">Deadline</th>
                    <th className="p-2 border">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="p-2 border">{task.name}</td>
                      <td className="p-2 border">{format(new Date(task.deadline), "yyyy-MM-dd")}</td>
                      <td className="p-2 border">
                        <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
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