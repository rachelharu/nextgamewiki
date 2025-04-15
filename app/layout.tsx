import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gamelookup",
  description: "a simple game lookup tool",
  icons: {
    icon: [
      {
        url: '/fav_icon.png'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable}`}>
        <main className="hero is-fullheight is-default is-bold">
         {children}
        </main>
      </body>
    </html>
  );
}
