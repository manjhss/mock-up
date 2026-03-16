import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MockUp - Create launch-ready product mockups instantly",
  description:
    "It includes only 4 steps - add slide, edit details, style it and download.",
  openGraph: {
    type: "website",
    title: "MockUp - Create launch-ready product mockups instantly",
    description:
      "It includes only 4 steps - add slide, edit details, style it and download.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "MockUp Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MockUp - Create launch-ready product mockups instantly",
    description:
      "It includes only 4 steps - add slide, edit details, style it and download.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
