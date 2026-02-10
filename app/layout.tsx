import type { Metadata } from "next";
import "@/theme/globals.css";

export const metadata: Metadata = {
  title: "starland-ai",
  description: "starland-ai is a platform for AI-powered notes.",
  icons:{
    icon:"/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-dark text-primary antialiased"
      >
        {children}
      </body>
    </html>
  );
}
