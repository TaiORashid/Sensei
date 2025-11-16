"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuildingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processDocument = async () => {
      try {
        // Get the uploaded file from sessionStorage
        const fileUrl = sessionStorage.getItem("uploadedPDF");
        if (!fileUrl) {
          setError("No file found. Please upload a PDF first.");
          setTimeout(() => router.push("/"), 2000);
          return;
        }

        // Convert blob URL back to File object
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], "document.pdf", { type: "application/pdf" });

        // Create FormData to send the file
        const formData = new FormData();
        formData.append("file", file);
        formData.append("num_quiz_questions", "10");

        // Call the API endpoint
        const apiResponse = await fetch("http://localhost:8000/api/process-document", {
          method: "POST",
          body: formData,
        });

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json().catch(() => ({ detail: "Unknown error" }));
          throw new Error(errorData.detail || `Server error: ${apiResponse.status}`);
        }

        const result = await apiResponse.json();

        if (result.success && result.data) {
          // Store the JSON data in sessionStorage
          sessionStorage.setItem("dashboardData", JSON.stringify(result.data));
          
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error processing document:", err);
        setError(err instanceof Error ? err.message : "Failed to process document");
      }
    };

    processDocument();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 
          className="text-white text-6xl md:text-7xl lg:text-8xl playfair-display"
          style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontStyle: 'normal' }}
        >
          Building your environment...
        </h1>
        {error && (
          <p className="text-red-500 mt-8 text-xl dm-sans-button">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

