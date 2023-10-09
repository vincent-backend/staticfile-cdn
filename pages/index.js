import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import BannerHome from "@layouts/components/banner/BannerHome";
import { IoChevronForwardSharp } from "react-icons/io5";

import CopyToClipboard from "@hooks/useClipboard";

import { notify } from "@hooks/useNotify";

import { getLibraryData, getLibraryList } from "@lib/data-load";
import LibraryView from "@layouts/components/home/LibraryView";

const Home = ({ data, lib_react, lib_default, isSuccess }) => {
  const { locale, setLocale } = useTranslation();

  // static data
  let dataOne = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(dataOne);

  // for init animation
  const [isInit, setInit] = useState(true);

  // data loaded successful?

  /// Library list
  const [isLibsShow, setLibsShow] = useState(false);
  const [libList, setLibList] = useState(null);
  const listRef = useRef(null);

  /// Primary Lib data
  const [libData, setLibData] = useState(lib_react);
  if (libData.rslt == false) {
    notify("error", "Server Connection error.");
  }

  /// Default Lib data
  // Vue, Angular.js, JQuery
  const [isDefaultMode, setDefaultMode] = useState(true);
  const [defaultLibArray, setDefaultLibArray] = useState(
    Object.values(lib_default),
  );

  let { banner, section } = frontmatter;

  const renderListItem = (http, filename, i) => {
    const urls = http + "://cdn.staticfile.org/" + filename;
    return (
      <li
        className="list-item"
        key={i}
        onClick={() => CopyToClipboard(urls, locale)}
      >
        {urls}
      </li>
    );
  };

  const handleSearchTextChange = async (e) => {
    const currText = e.target.value;

    if (currText == "") {
      setLibsShow(false);
      setLibData(lib_react);
      setDefaultMode(true);
    } else {
      try {
        const { rslt, data } = await getLibraryList(currText);
        const list = data.results.map((d) => d.name);
        if (list.length > 0) {
          setLibList(list);
          setLibsShow(true);
        } else {
          setLibsShow(false);
        }
      } catch (error) {
        console.log(error);
        setLibsShow(false);
        notify("error", "Server Connection failed.");
      }
    }
  };

  const handleLibItemClick = async (lib) => {
    setLibsShow(false);
    setDefaultMode(false);

    const ld = await getLibraryData(lib);

    if (ld.rslt == true) {
      setLibData(ld);
      /// set state
    } else {
      setLibData(lib_react);
      setDefaultMode(true);
      notify("error", "Server connection failed.");
    }
  };

  const animateFunc = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 },
      )
        .fromTo(
          ".banner-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4",
        )
        .fromTo(
          ".banner-img",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          ">-.5",
        )
        .fromTo(
          ".banner-link",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "<",
        );
    });

    return () => ctx.revert();
  };

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

    if (isInit) {
      animateFunc();
      setInit(false);
    }

    // mouse down
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setLibsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locale, data, isInit]);

  return (
    <Base>
      <section className="section">
        <div className="flex bg-primary overflow-hidden">
          <div className="container">
            <div className="banner-bg md:min-h-[450px]">
              <div className="row">
                <div className="relative col-12 md:col-6 z-10 pb-10">
                  <div className="pt-14 md:pt-[98px]">
                    {markdownify(banner.title, "h3", "banner-title opacity-0")}
                    {markdownify(
                      banner.content,
                      "h5",
                      "banner-text text-justify opacity-0",
                    )}
                    <div className={`banner-link`}>
                      <span className="text-primary font-normal inline tracking-normal">
                        $ npm install –g sfile
                      </span>
                      <span className="text-[#292d33] ml-1">
                        {`// `}
                        {markdownify(
                          banner.installation_tools,
                          "h6",
                          "opacity-1 text-[#292d33] inline",
                        )}
                      </span>
                      <span className="pl-2 text-[#ff941a] break-keep">
                        <Link href="/apis">
                          {markdownify(
                            banner.usage,
                            "h6",
                            "text-[#ff941a] inline-flex",
                          )}
                          <IoChevronForwardSharp className="inline-flex h4" />
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="banner-img flex col-12 md:col-6 opacity-0 justify-center items-center px-0 lg:right-0 z-0">
                  <div className="md:absolute md:top-0">
                    <BannerHome />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search bar && Library List View */}
        <div className="row container mb-[92px]">
          <div className="relative flex justify-center items-center">
            <div className="absolute container">
              <div className="bg-[url('/images/home/icon-search.png')] w-[19px] h-[19px] absolute ml-8 mt-[24px]" />
              <input
                onChange={handleSearchTextChange}
                className="search-input"
                type="search"
                aria-label="Search open source libraires."
                placeholder={banner.search_bar_placeholder}
              />
            </div>
            {isLibsShow && (
              <div className="absolute container top-[33px] z-30" ref={listRef}>
                <div className="h-full bg-white border border-border rounded-sm text-h6 max-h-[300px] overflow-y-scroll ">
                  <ul>
                    {libList.map((l, i) => (
                      <li
                        key={i}
                        className="search-list-item"
                        onClick={() => handleLibItemClick(l)}
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Primary Lib data */}
        {libData && <LibraryView section={section} libData={libData} />}

        {/* If default show */}
        {isDefaultMode &&
          defaultLibArray.map((lib, index) => (
            <LibraryView section={section} libData={lib} key={lib.name} />
          ))}
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/index");

  const lib_react = await getLibraryData("react");
  const lib_vue = await getLibraryData("vue");
  const lib_angular = await getLibraryData("angular.js");
  const lib_jquery = await getLibraryData("jquery");

  return {
    props: {
      data,
      lib_react: lib_react,
      lib_default: { lib_vue, lib_angular, lib_jquery },
    },
  };
};
