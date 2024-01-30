import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import BannerHome from "@layouts/components/banner/BannerHome";
import { IoChevronForwardSharp } from "react-icons/io5";
import Image from "next/image";
import CopyToClipboard from "@hooks/useClipboard";

import { getLibraryData, getLibraryList } from "@lib/data-load";
import LibraryView from "@layouts/components/home/LibraryView";
import { cdn_url_http, cdn_url_https } from "constant";

const Home = ({ data }) => {
  const { locale, setLocale } = useTranslation();

  // static data
  let dataOne = data.filter((dt) => dt.lang === locale)[0];
  const [frontmatter, setFrontmatter] = useState(dataOne);

  // for init animation
  const [isInit, setInit] = useState(true);

  /// Library list
  const [isLibsShow, setLibsShow] = useState(false);
  const [libList, setLibList] = useState(null);
  const [isListSearching, setListSearching] = useState(false);
  const [isFilelistFetching, setFilelistFetching] = useState(false);
  const listRef = useRef(null);

  /// Primary Lib data
  const [libData, setLibData] = useState(null);

  /// Default Lib data
  // React, Vue, Angular.js, JQuery
  const [isLoadingDefaultLib, setLoadingDefaultLib] = useState(true);
  const [isDefaultMode, setDefaultMode] = useState(true);
  const [defaultLibArray, setDefaultLibArray] = useState(null);

  let { banner, section } = frontmatter;

  // alert
  const [isAlertShow, setAlertShow] = useState(false);

  const renderListItem = (http, filename, i) => {
    const urls =
      http == "https" ? cdn_url_https + filename : cdn_url_http + filename;
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
    if (isListSearching) return;

    if (currText == "") {
      setLibsShow(false);
      setDefaultMode(true);
    } else if (currText.length > 2) {
      try {
        setListSearching(true);
        const { rslt, data } = await getLibraryList(currText);
        setListSearching(false);
        if (data.length > 0) {
          setLibList(data);
          setLibsShow(true);
        } else {
          setLibsShow(false);
        }
      } catch (error) {
        console.log("API Server Connection Failed..");
        setLibsShow(false);
        setListSearching(false);
      }
    }
  };

  const handleLibItemClick = async (lib) => {
    setLibsShow(false);
    setDefaultMode(false);
    setFilelistFetching(true);
    const ld = await getLibraryData(lib);

    if (ld.rslt == true) {
      setLibData(ld);
      /// set state
    } else {
      setDefaultMode(true);
    }
    setFilelistFetching(false);
  };

  const animateFunc = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".banner-title",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
      )
        .fromTo(
          ".banner-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4"
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
          ">-.5"
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
          "<"
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
      setTimeout(() => setAlertShow(true), 1000);
    }

    if (defaultLibArray == null) {
      const getDefault = async () => {
        setLoadingDefaultLib(true);
        const t_react = await getLibraryData("react");
        const t_vue = await getLibraryData("vue");
        const t_angular = await getLibraryData("angular.js");
        const t_jquery = await getLibraryData("jquery");
        const t_default = { t_react, t_vue, t_angular, t_jquery };
        const t_defaultarr = Object.values(t_default);
        setDefaultLibArray(t_defaultarr);
        setLoadingDefaultLib(false);
      };
      getDefault();
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
      <section className="section relative scroll-smooth">
        <div
          className={clsx(
            "fixed left-0 top-[59px] z-20 w-full opacity-0 transition-all duration-300 ease-in",
            isAlertShow && "opacity-100"
          )}
        >
          <div className="bg-[#FFF3E6] pt-1">
            <div className="container flex flex-row items-center gap-[14px] py-2">
              <Image
                alt="anounce"
                src="/images/home/ic_announce.svg"
                width={24}
                height={24}
              />
              <p className="text-base leading-tight text-[#FF941A] md:flex-grow">
                {banner.anounce}
              </p>
              <button
                onClick={() => setAlertShow(false)}
                className="min-h-[18px] min-w-[18px] bg-[url('/images/home/del_nor.svg')] hover:bg-[url('/images/home/del_hover.svg')] active:bg-[url('/images/home/del_hover.svg')]"
              />
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden bg-primary">
          <div className="container">
            <div className="banner-bg md:min-h-[450px]">
              <div className="row">
                <div className="col-12 relative z-10 pb-10 md:col-6">
                  <div className="pt-14 md:pt-[98px]">
                    {markdownify(banner.title, "h3", "banner-title opacity-0")}
                    {markdownify(
                      banner.content,
                      "h5",
                      "banner-text text-justify opacity-0"
                    )}
                    <div className={`banner-link`}>
                      <span className="inline whitespace-nowrap font-normal tracking-normal text-primary">
                        $ npm install –g sfile
                      </span>
                      <span className="ml-1 text-base text-[#292d33]">
                        {`// `}
                        {markdownify(
                          banner.installation_tools,
                          "h6",
                          "opacity-1 text-[#292d33] inline text-base"
                        )}
                      </span>
                      <span className="whitespace-nowrap pl-2 text-[#ff941a]">
                        <Link href="https://github.com/staticfile/cli#readme">
                          {markdownify(
                            banner.usage,
                            "h6",
                            "text-[#ff941a] inline-flex text-base"
                          )}
                          <IoChevronForwardSharp className="h4 inline-flex" />
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="banner-img col-12 z-0 flex items-center justify-center px-0 opacity-0 md:col-6 lg:right-0">
                  <div className="md:absolute md:top-0">
                    <BannerHome />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Search bar && Library List View */}
        <div className="container row mb-[92px]">
          <div className="relative flex items-center justify-center">
            <div className="container absolute">
              <div className="absolute ml-8 mt-[24px] h-[19px] w-[19px] bg-[url('/images/home/icon-search.png')]" />
              <input
                onChange={handleSearchTextChange}
                className="search-input"
                type="search"
                aria-label="Search open source libraires."
                placeholder={banner.search_bar_placeholder}
              />
            </div>
            {isLibsShow && (
              <div className="container absolute top-[33px] z-30" ref={listRef}>
                <div className="h-full max-h-[300px] overflow-y-scroll rounded-sm border border-border bg-white text-h6 ">
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
        {isDefaultMode ? (
          <>
            {isLoadingDefaultLib ? (
              <div className="flex w-full h-[200px] mb-[60px] md:mb-[90px] items-start justify-center">
                <Image
                  alt="loading"
                  src="/images/loading.gif"
                  width={150}
                  height={150}
                />
              </div>
            ) : (
              defaultLibArray &&
              defaultLibArray.map((lib, index) => (
                <LibraryView section={section} libData={lib} key={index} />
              ))
            )}
          </>

        ) : (
          <div className="w-full">
            {isFilelistFetching ? (
              <div className="flex w-full h-[200px] mb-[60px] md:mb-[90px] items-start justify-center">
                <Image
                  alt="loading"
                  src="/images/loading.gif"
                  width={150}
                  height={150}
                />
              </div>
            ) : (
              libData && <LibraryView section={section} libData={libData} />
            )}
          </div>
        )}
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/index");

  return {
    props: {
      data,
    },
  };
};
