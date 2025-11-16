import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Sensei",
  description: "Your lecture slides dashboard",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#034748]">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl font-semibold mb-6">
            Dashboard
          </h1>
          <p className="text-white/80 text-lg">
            This page will be implemented later.
          </p>
        </div>
      </div>
    </div>
  );
}

