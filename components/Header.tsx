import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import { MdNightlightRound, MdWbSunny } from "react-icons/md";
import { page, toggleColorScheme } from "@/store/page";
import NoSSR from "react-no-ssr";
import { publicRuntimeConfig } from "@/config";

function Header() {
  const { pathname } = useRouter();

  const { colorScheme } = page.use();
  const isDarkMode = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);

  return (
    <header className="container">
      <title>{publicRuntimeConfig.APP_NAME}</title>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <strong>{publicRuntimeConfig.APP_NAME}</strong>
            </Link>
          </li>
        </ul>

        <ul>
          <li className={clsx({ active: pathname === "/about" })}>
            <Link href="/about">About</Link>
          </li>
          <NoSSR
            onSSR={
              <li>
                <button
                  type="button"
                  className="theme-toggle-button"
                  data-theme-switcher={colorScheme}
                  onClick={toggleColorScheme}
                >
                  &nbsp;
                </button>
              </li>
            }
          >
            <li>
              <button
                type="button"
                className="theme-toggle-button"
                data-theme-switcher={colorScheme}
                onClick={toggleColorScheme}
              >
                <MdNightlightRound fill="white" className={clsx({ hidden: !isDarkMode })} />
                <MdWbSunny fill="black" className={clsx({ hidden: isDarkMode })} />
              </button>
            </li>
          </NoSSR>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
