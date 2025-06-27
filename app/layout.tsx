import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import "./globals.scss";
import { theme } from '../theme';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const radioCanada = Radio_Canada({
  variable: "--font-radio-canada",
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
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${radioCanada.variable}`}>
        <MantineProvider theme={theme}>
          <main className="hero is-fullheight is-default is-bold">
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
