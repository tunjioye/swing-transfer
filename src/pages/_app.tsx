import { useEffect } from "react";
import type { AppProps } from "next/app";
import Header from "components/Header";
import Footer from "components/Footer";
import { page, setColorScheme } from "@/store/page";
import { PageTransition } from "next-page-transitions";

import "@picocss/pico";
import "src/style/theme.css";
import "src/style/style.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { colorScheme } = page.use();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const systemColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    systemColorScheme.addEventListener("change", (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? "dark" : "light";
      setColorScheme(newColorScheme);
    });
    return () => {
      systemColorScheme.removeEventListener("change", () => null);
    };
  }, []);

  return (
    <>
      <Header />
      <PageTransition timeout={300} classNames="main page-transition">
        <Component {...pageProps} key={pathname} />
      </PageTransition>
      <Footer />
      <style jsx global>{`
        .main {
          flex: 1;
        }
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </>
  );
}
