import type { Metadata } from "next";
import localFont from "next/font/local";
import LayoutWrapper from "@/components/LayoutWrapper";
import { auth } from "@/lib/auth";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Canada Citizenship Mock Test | Pass on your first try",
    template: "%s | Canada Citizenship Mock Test"
  },
  description: "Prepare for your Canadian Citizenship Test with our free, realistic 20-question mock exams based on the Discover Canada study guide.",
  keywords: ["Canada Citizenship Test", "Discover Canada", "Mock Exam", "Canadian Citizenship Practice Test", "Citizenship Study Guide"],
  authors: [{ name: "Mock Test Prep" }],
  creator: "Mock Test Prep",
  publisher: "Mock Test Prep",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Canada Citizenship Mock Test",
    description: "Prepare effectively with our interactive, timed mock tests. We use the real official Discover Canada study guide to generate questions.",
    url: "https://canada-mock-test.vercel.app",
    siteName: "Canada Citizenship Mock Test",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canada Citizenship Mock Test",
    description: "Pass your Canada Citizenship test on the first try. Take a free practice exam today.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper session={session} />
        {children}
      </body>
    </html>
  );
}
