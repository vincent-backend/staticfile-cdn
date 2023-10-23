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
import { IoChevronForwardSharp } from "react-icons/io5";

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
      <header
        className={`header ${sticky && "header-sticky"} ${
          direction === 1 && "unpinned"
        } shadow-md`}
        ref={headerRef}
      >
        <nav className="navbar container-header">
          {/* logo */}
          <div className="order-0 py-0 ml-7 md:ml-4">
            <Logo src={logo} />
          </div>
          <ul
            id="nav-menu"
            className={`navbar-nav order-2 justify-start ml-0 md:order-1 md:flex ${
              !showMenu && "hidden"
            }`}
          >
            <div className="bg-primary opacity-95 w-full h-screen md:flex md:h-auto md:bg-white md:space-x-11">
              <div className="h-10 md:hidden" />
              {main.map((menu, i) => (
                <React.Fragment key={`menu-${i}`}>
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link flex align-middle items-center justify-center ${
                        asPath === menu.url && "active"
                      }`}
                      onClick={() => setShowMenu(false)}
                    >
                      <div className="pl-[80px] text-left grow md:pl-0 md:grow-0 md:text-center">
                        {menu.name}
                      </div>
                      <div className="grow text-right pr-[70px] md:hidden">
                        <IoChevronForwardSharp className="inline-flex text-[2rem]" />
                      </div>
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </div>
          </ul>
          <div className="order-1 ml-auto mr-5 flex items-center">
            {config.nav_button.enable && (
              <button
                className="btn btn-primary flex items-center w-fit px-3 h-auto md:h-[34px] mr-4 sm:mr-14 md:mr-1"
                onClick={() => setLocale(`${locale == "en" ? "cn" : "en"}`)}
              >
                {locale === "en"
                  ? config.nav_button.label_cn
                  : config.nav_button.label_en}
                <Image
                  src="/images/home/nav_btn_ic_toggle.svg"
                  alt="swap"
                  width="18"
                  height="18"
                  className="ml-1 inline w-[18px] h-[18px]"
                />
              </button>
            )}

            {/* navbar toggler */}
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl font-bold text-dark md:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <CgClose />
              </button>
            ) : (
              <button
                className="h-8 w-8 text-3xl font-bold text-dark md:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <GiHamburgerMenu className="h-8 w-8" />
              </button>
            )}
            {/* /navbar toggler */}
          </div>
        </nav>
      </header>
      <div className="header-height-fix"></div>
    </>
  );
};

export default Header;
