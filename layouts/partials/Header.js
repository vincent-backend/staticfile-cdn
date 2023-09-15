import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const { asPath } = useRouter();

  // logo source
  const { logo } = config.site;

  return (
    <>
      <div className="header-height-fix"></div>
      <header
        className={`header ${sticky && "header-sticky"} ${
          direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        <nav className="navbar container-xl">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>

          <ul
            id="nav-menu"
            className={`navbar-nav order-2 w-full justify-center md:w-auto md:space-x-2 lg:order-1 lg:flex ${
              !showMenu && "hidden"
            }`}
          >
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden max-h-0 w-full overflow-hidden border border-border-secondary py-0 transition-all duration-500 group-hover:block group-hover:max-h-[106px] group-hover:py-2 lg:invisible lg:absolute lg:left-1/2 lg:block lg:w-auto lg:-translate-x-1/2 lg:group-hover:visible lg:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link block transition-all ${
                              asPath === child.url && "active"
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
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
                )}
              </React.Fragment>
            ))}
            {config.nav_button.enable && (
              <li className="nav-item lg:hidden">
                <Link
                  className="btn btn-primary hidden lg:flex"
                  href={config.nav_button.link}
                >
                  {config.nav_button.label}
                </Link>
              </li>
            )}
          </ul>
          <div className="order-1 ml-auto flex items-center md:ml-0">
            {config.nav_button.enable && (
              <Link
                className="btn btn-primary mr-4 lg:flex lg:mr-40"
                href={config.nav_button.link}
              >
                ENGLISH
              </Link>
            )}

            {/* navbar toggler */}
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl text-dark lg:hidden"
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
