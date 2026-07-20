import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Geist, Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/utils/supabase/server";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import LocationPage from "@/components/Location";
import "./globals.css";
// import MouseParticles from "@/components/ui/mousePArticles";
import CanvasParticles from "@/components/ui/particleCanvas";
import CrispInitializer from "@/components/CrispInitializer";

const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

let User: any;

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Lang Q | Flutter Localization Tool",
  description:
    "The fastest way to translate and internationalize your Flutter app with AI.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: ["Lang Q", "Translate", "Internationalisation"],
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
    title: "Lang Q",
    description:
      "The fastest way to translate and internationalize your Flutter app with AI.",
    url: defaultUrl,
    siteName: "Lang Q",
    // images: [
    //   {
    //     url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/ogImage.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNjcwMDQxYS03MDUyLTQ1ZDUtOWJkOS0xMjMzY2Q0NjM1ZmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYW5ncS9vZ0ltYWdlLnBuZyIsImlhdCI6MTc1MDY5NzYwOCwiZXhwIjoxNzgyMjMzNjA4fQ.hcCYnNnyNtG1RHLavc4H6--iPs1GHx6XduMpiTpMBoc",
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/ogImage.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNjcwMDQxYS03MDUyLTQ1ZDUtOWJkOS0xMjMzY2Q0NjM1ZmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYW5ncS9vZ0ltYWdlLnBuZyIsImlhdCI6MTc1MDY5NzYwOCwiZXhwIjoxNzgyMjMzNjA4fQ.hcCYnNnyNtG1RHLavc4H6--iPs1GHx6XduMpiTpMBoc",
    //     width: 1800,
    //     height: 1600,
    //     alt: "My custom alt",
    //   },z
    // ],
  },
  // icons: {
  //   icon: [
  //     {
  //       url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
  //     },
  //     new URL(
  //       "/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
  //       "https://ymsreanckxyrthosfqiq.supabase.co"
  //     ),
  //     {
  //       url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
  //       media: "(prefers-color-scheme: dark)",
  //     },
  //   ],
  //   shortcut: ["/shortcut-icon.png"],
  //   apple: [
  //     {
  //       url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
  //     },
  //     {
  //       url: "https://ymsreanckxyrthosfqiq.supabase.co/storage/v1/object/sign/langq/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E2NzAwNDFhLTcwNTItNDVkNS05YmQ5LTEyMzNjZDQ2MzVmZiJ9.eyJ1cmwiOiJsYW5ncS9sb2dvLnBuZyIsImlhdCI6MTc0NTc3ODYxMywiZXhwIjoxNzc3MzE0NjEzfQ.aIE7AB9A24x2GOcR8Sa9ZLWx4wQXO32cIn-qoA1Vgt0",
  //       sizes: "180x180",
  //       type: "image/png",
  //     },
  //   ],
  // },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

async function getUser() {
  const supabase = await createClient();

  supabase.auth.getUser().then((res) => {
    User = res?.data?.user ? JSON.stringify(res?.data?.user) : null;
  });
}

const isProd = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  getUser();
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJNLM8VS')`,
          }}
        />
        {/* <link href="https://fonts.cdnfonts.com/css/banilu" rel="stylesheet" /> */}
      </head>
      <body
        className="bg-background text-foreground dark:bg-black"
        data-testim-main-word-scripts-loaded="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CrispInitializer />
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-5 items-center">
              <Navigation />
              <div
                className={`${User ? "" : ""} w-full grow p-5 sm:p-2 flex justify-center`}
              >
                <div className="w-full flex flex-col gap-5 p-5 sm:p-2 grow">
                  {/* <MouseParticles /> */}
                  {/* <CanvasParticles /> */}
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
        <div className="hidden">
          <LocationPage />
        </div>

        <div id="portal-root" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJNLM8VS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
      {isProd && (
        <GoogleTagManager
          gtmId="GT-W6B38CG2"
          gtmScriptUrl="https://www.googletagmanager.com/gtag/js?id=G-H0R13L4J67"
        />
      )}
      {isProd && <GoogleAnalytics gaId="G-H0R13L4J67" />}
    </html>
  );
}
