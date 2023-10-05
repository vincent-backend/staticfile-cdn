import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Dropdown from "@layouts/components/dropdown/Dropdown";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";
import BannerHome from "@layouts/components/banner/BannerHome";
import { IoChevronForwardSharp } from "react-icons/io5";

import CopyToClipboard from "@hooks/useClipboard";

import { notify } from "@hooks/useNotify";

import { getFileList, getLibraryData, getLibraryList } from "@lib/data-load";

const Home = ({ data, lib_react, lib_vue, lib_angular, lib_jquery }) => {
  const { locale, setLocale } = useTranslation();

  let dataOne = data.filter((dt) => dt.lang === locale)[0];

  const [frontmatter, setFrontmatter] = useState(dataOne);

  const [isInit, setInit] = useState(true);

  /// Library list
  const [isLibsShow, setLibsShow] = useState(false);
  const [libList, setLibList] = useState(null);

  /// Primary Lib data
  const [libData, setLibData] = useState(lib_react);
  if (libData == undefined) {
    notify("error", "Server Connection Timed out.");
  }
  const [isDefaultLibs, setDefaultLibs] = useState(true);
  const [fileList, setFileList] = useState(libData.files);
  const [currentVersion, setVersion] = useState(libData.latest_version);
  const versionRef = useRef(null);

  let { banner, section } = frontmatter;

  const renderListItem = (http, name, version, filename, i) => {
    const urls = http + "://cdn.staticfile.org/" + name + "/" + version + "/" + filename;
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
      console.log("search text cleared");
      setLibList(null);
      setLibsShow(false);
      setLibData(lib_react);
      setDefaultLibs(true);
    } else {
      console.log("search text changed.");
      try {
        const rslt = await getLibraryList(currText);
        const list = rslt.results.map((d) => d.name);
        if (list.length > 0) {
          setLibList(list);
          setLibsShow(true);
        } else {
          setLibList(null);
          setLibsShow(false);
        }
      } catch (error) {
        console.log(error);
        setLibsShow(false);
        notify("error", "Server Connection Timed out.");
        //setLibData(defaultLibdata);
      }
    }
  };

  const handleLibItemClick = async (lib) => {
    const ld = await getLibraryData(lib);

    console.log("current lib data");
    console.log(ld);

    if (ld != null) {
      setLibData(ld);
      setDefaultLibs(false);
      /// set state
      setFileList(libData.files);
      setVersion(libData.latest_version);
    } else {
      setLibData(lib_react);
      setDefaultLibs(true);
      notify("error", "Server Connection Timed out.");
    }

    setLibsShow(false);
  };

  const handleVersionChange = async (libname, version) => {
    setVersion(version);

    const res = await getFileList(libname, version);

    if (res != null) {
      setFileList(res.files);
    }
  }


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

    /// set state
    setFileList(libData.files);
    setVersion(libData.latest_version);

  }, [locale, data, libData]);

  return (
    <Base>
      <section className="section">
        <div className="row bg-primary">
          <div className="container overflow-hidden">
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
              <div className="absolute container top-[33px] z-30">
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

        {/* Default Lib data */}
        {libData != null && (
          <div className="container flex justify-center pb-[50px]">
            <div className="col-12 px-1">
              <div className="section_title">{libData.name.toUpperCase()}</div>
              <div className="section_description">{libData.description}</div>
              <div className="flex flex-col relative mt-[30px]">
                <div>
                  <Tabs>
                    <Tab name="HTTPS">
                      <ul role="list" className="home-tab-ul">
                        {fileList.map((file, index) =>
                          renderListItem("https", libData.name, currentVersion, file, index),
                        )}
                      </ul>
                    </Tab>
                    <Tab name="HTTP">
                      <ul role="list" className="home-tab-ul">
                        {fileList.map((file, index) =>
                          renderListItem("http", libData.name, currentVersion, file, index),
                        )}
                      </ul>
                    </Tab>
                  </Tabs>
                </div>
                <div className="absolute top-0 right-0">
                  <div className="dropdown">
                    <select className="dropbtn" value={currentVersion} onChange={(e) => handleVersionChange(libData.name, e.target.value)}>
                      {libData.versions.map((version) => (
                        <option key={version} value={version}>
                          {version}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="online-store">
                <a href={section.react.href}>{section.online_store}</a>
              </div>
            </div>
          </div>
        )}

        {/* If default show */}
        {isDefaultLibs && (
          // vue
          <div className="container flex justify-center pb-[50px]">
            <div className="col-12 px-1">
              <div className="section_title">{section.react.title}</div>
              <div className="section_description">
                {section.react.description}
              </div>
              {/* Tab */}
              <div className="flex flex-col relative mt-[30px]">
                <div>
                  <Tabs>
                    <Tab name="HTTPS">
                      <ul role="list" className="home-tab-ul">

                      </ul>
                    </Tab>
                    <Tab name="HTTP">
                      <ul role="list" className="home-tab-ul">

                      </ul>
                    </Tab>
                  </Tabs>
                </div>
                <div className="absolute top-0 right-0">
                  <Dropdown />
                </div>
              </div>
              {/*Online Store*/}
              <div className="online-store">
                <a href={section.react.href}>{section.online_store}</a>
              </div>
            </div>
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

  const libdata_react = await getLibraryData("react");
  const libdata_vue = await getLibraryData("vue");
  const libdata_angular = await getLibraryData("angular.js");
  const libdata_jquery = await getLibraryData("jquery");

  return {
    props: {
      data,
      lib_react: libdata_react,
      lib_vue: libdata_vue,
      lib_angular: libdata_angular,
      lib_jquery: libdata_jquery,
    },
  };
};
