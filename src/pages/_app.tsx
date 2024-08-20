import { Caveat } from "next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import localfont from "next/font/local";
import { LayoutTheme } from "@nextui-org/react";

import { api } from "@/utils/api";

import "../styles/globals.css";
import "prismjs";
import "prismjs/components/prism-javascript";
import "prism-themes/themes/prism-vsc-dark-plus.css";

import { Providers } from "../components/nextui/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

const Satochi = localfont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/Satoshi-Black.otf",
      weight: "900",
    },
  ],
  variable: "--font-satochi",
});

const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Providers>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <title>
            Femlo - Generate confidence, Generate more sells in a beautiful way
          </title>

          <meta
            property="og:image"
            content="https://res.cloudinary.com/dayloxa2a/image/upload/v1724163090/roynlbztxkqcwk9mvssr.png"
          />
          <meta property="og:image:alt" content="Femlo preview image" />

          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dayloxa2a/image/upload/v1724163090/roynlbztxkqcwk9mvssr.png"
          />
          <meta name="twitter:image:alt" content="Femlo preview image" />
        </Head>
        <main
          className={`font-satochi ${Satochi.className} ${Satochi.variable} ${caveat.variable} `}
        >
          <Navbar>
            <Component {...pageProps} />
            <Footer />
          </Navbar>
        </main>
      </Providers>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
