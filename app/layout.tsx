import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LangQ",
  description: "Translate Lightning-Fast & Accurate. Unlock Global Reach.",
  keywords: ["LangQ", "Translate", "Internationalisation"],
  authors: [{ name: "ArunEt" }, { name: "Arun", url: "https://et-008.in/" }],
  creator: "Arun Et",
  publisher: "Arun Et",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "LangQ",
    description: "Translate Lightning-Fast & Accurate. Unlock Global Reach.",
    url: defaultUrl,
    siteName: "LangQ",
    images: [
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/og-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9vZy1pbWFnZS5wbmciLCJpYXQiOjE3NDU3NzcwOTMsImV4cCI6MTgwODg0OTA5M30.6bDWBfm9Qike3XtOqJiOR6n1Ze0hswEKLRLbNFPrRPA", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/og-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9vZy1pbWFnZS5wbmciLCJpYXQiOjE3NDU3NzcwOTMsImV4cCI6MTgwODg0OTA5M30.6bDWBfm9Qike3XtOqJiOR6n1Ze0hswEKLRLbNFPrRPA", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
      },
      new URL(
        "/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
        "https://ymsreanckxyrthosfqiq.supabase.co"
      ),
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: ["/shortcut-icon.png"],
    apple: [
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
      },
      {
        url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body
        className="bg-background text-foreground dark:bg-black"
        data-testim-main-word-scripts-loaded="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-5 items-center">
              <Navigation />
              <div className="main-div w-full grow p-5 flex justify-center">
                <div className="flex flex-col gap-20 max-w-6xl p-5 grow">
                  {children}
                </div>
              </div>
              <Footer />

              {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    ©️ LanQ Inc.
                  </a>
                </p>
              </footer> */}
            </div>
          </main>
        </ThemeProvider>

        <div id="portal-root" />
      </body>
    </html>
  );
}
