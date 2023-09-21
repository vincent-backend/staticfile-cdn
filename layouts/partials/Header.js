import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import useTranslation from "@hooks/useTranslation";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

const Header = () => {
  // distructuring the main menu from menu object
  const { en, cn } = menu;

  // states declaration
  const { locale, setLocale } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);
  const [main, setMain] = useState(locale === "cn" ? cn : en);

  const { asPath } = useRouter();

  // logo source
  const { logo } = config.site;

  useEffect(() => {
    if (locale === "cn") {
      setMain(cn);
    } else {
      setMain(en);
    }
  }, [locale]);

  return (
    <>
      <div className="header-height-fix"></div>
      <header
        className={`header ${sticky && "header-sticky"} ${
          direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        <nav className="navbar lg:container-xl">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>
          <ul
            id="nav-menu"
            className={`navbar-nav order-2 w-full justify-start ml-0 md:w-auto md:space-x-4 lg:order-1 lg:flex ${
              !showMenu && "hidden"
            }`}
          >
            <div className="bg-primary opacity-95 h-screen lg:flex lg:h-auto lg:ml-3 lg:bg-white">
              <div className="pb-20 lg:hidden" />
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${
                        asPath === menu.url && "active"
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </div>
          </ul>
          <div className="order-1 ml-auto mr-2 flex items-center">
            {config.nav_button.enable && (
              <button
                className="btn btn-primary truncate inline-flex w-[30px] px-0 sm:px-2 sm:w-fit mr-1 md:mr-10 "
                onClick={() => setLocale(`${locale == "en" ? "cn" : "en"}`)}
              >
                {locale === "en"
                  ? config.nav_button.label_cn
                  : config.nav_button.label_en}
                <Image
                  src="/images/swap.svg"
                  alt="swap"
                  width={20}
                  height={16}
                  className="ml-1 inline"
                />
              </button>
            )}

            {/* navbar toggler */}
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl font-bold text-dark lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <CgClose />
              </button>
            ) : (
              <button
                className="text-dark lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <GiHamburgerMenu className="h-8 w-8" />
              </button>
            )}
            {/* /navbar toggler */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
