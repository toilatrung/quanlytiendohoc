export const metadata = {
  title: "Quản lý tiến độ học",
  description: "App theo dõi tiến độ dự án học tập",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
