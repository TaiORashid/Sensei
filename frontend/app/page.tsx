"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import InteractiveSlider from "@/components/InteractiveSlider";
import GridBackground from "@/components/GridBackground";

export default function Home() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setSelectedFile(file);
    router.push("/dashboard");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleOpenOverlay = () => {
    // Dummy button - placeholder for future functionality
    console.log("Open Overlay clicked");
  };

  // Placeholder images - replace with actual images
  // For now using a gradient placeholder - replace with actual image paths
  const image1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23f0f0f0' width='800' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23999'%3EImage 1%3C/text%3E%3C/svg%3E";
  const image2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23e0e0e0' width='800' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='.3em' fill='%23999'%3EImage 2%3C/text%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-black relative">
      {/* Grid Background */}
      <GridBackground squareSize={20} spacing={4} cursorRadius={300} />

      {/* Logo in top left with white container */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <Image
            src="/images/logo/logo.png"
            alt="Sensei Logo"
            width={180}
            height={54}
            priority
          />
        </div>
      </div>

      {/* Sign In button in top right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          className="bg-white text-black px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg dm-sans-button"
        >
          Sign In
        </button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Spacing for logo */}
          <div className="h-20 md:h-24"></div>

          {/* Main heading */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl text-center mb-12 md:mb-16 leading-tight playfair-display" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'normal' }}>
            Where your lecture slides finally make sense.
          </h1>

          {/* Interactive slider - same width as text container */}
          <div className="mb-12 md:mb-16 w-full">
            <InteractiveSlider
              image1={image1}
              image2={image2}
              alt1="Before"
              alt2="After"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* PDF Upload Button */}
            <button
              onClick={handleUploadClick}
              className="bg-white text-black px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto dm-sans-button"
            >
              {selectedFile ? `Uploaded: ${selectedFile.name}` : "Upload PDF"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Open Overlay Button */}
            <button
              onClick={handleOpenOverlay}
              className="bg-white text-black px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto dm-sans-button"
            >
              Open Overlay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

