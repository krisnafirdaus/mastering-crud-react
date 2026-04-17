import "./globals.css";
import { Sidebar } from "@/components/shared/sidebar/sidebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-50">
        <div className="min-h-screen">
          <Sidebar />

          <main className="ml-70 h-screen overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
