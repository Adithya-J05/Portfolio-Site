import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates, { CertificateData } from "@/components/Certificates";
import GithubStats from "@/components/GithubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Read certificates dynamically from public/images/certificates
  const certificatesDir = path.join(process.cwd(), "public/images/certificates");
  let certificates: CertificateData[] = [];
  
  // Auto-detect profile image dynamically
  const profileDir = path.join(process.cwd(), "public/images/profile");
  let profileImageSrc = "/images/profile/profile.jpeg"; // default fallback

  try {
    if (fs.existsSync(profileDir)) {
      const files = fs.readdirSync(profileDir);
      const imgFile = files.find((file) => {
        const ext = file.split(".").pop()?.toLowerCase();
        return ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "webp";
      });
      if (imgFile) {
        profileImageSrc = `/images/profile/${imgFile}`;
      }
    }
  } catch (error) {
    console.error("Error auto-detecting profile image:", error);
  }

  try {
    if (fs.existsSync(certificatesDir)) {
      const files = fs.readdirSync(certificatesDir);
      
      certificates = files
        .filter((file) => {
          const ext = file.split(".").pop()?.toLowerCase();
          return ext === "pdf" || ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "webp";
        })
        .map((file) => {
          const ext = file.split(".").pop()?.toLowerCase();
          const type = ext === "pdf" ? "pdf" : "image";
          
          // Convert filename to title: remove extension, replace underscores/dashes/commas with spaces, clean whitespace
          const baseName = file.substring(0, file.lastIndexOf(".")) || file;
          const title = baseName
            .replace(/[_-]/g, " ")
            .replace(/,/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .map((word) => {
              if (/^(ai|ml|aws|nptel|hsc|ssc|vit|vityarthi|pr|sde|it|iit)$/i.test(word)) {
                // Keep acronyms uppercase, special case for VITyarthi
                if (word.toLowerCase() === "vityarthi") return "VITyarthi";
                return word.toUpperCase();
              }
              // Capitalize first letter
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");

          return {
            filename: file,
            title,
            type,
            url: `/images/certificates/${encodeURIComponent(file)}`,
          };
        });
    }
  } catch (error) {
    console.error("Error loading certificates dynamic nodes:", error);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navigation bar header */}
      <Navbar />

      {/* Main content grid stream */}
      <main className="flex-1">
        <Hero profileImageSrc={profileImageSrc} />
        <About />
        <Skills />
        <Toolkit />
        <Projects />
        <Experience />
        {/* Render dynamic certifications section */}
        <Certificates certificates={certificates} />
        <GithubStats />
        <Contact />
      </main>

      {/* Footer copyright and telemetry termination */}
      <Footer />
    </div>
  );
}
