import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin Dashbaord",
  description: "Admin Dashbaord for clinic",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     
     <main className=' bg-[#ffff]'>
          {children}
    </main>
    
  );
}
