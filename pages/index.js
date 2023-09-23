import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";
import BannerHome from "@layouts/components/banner/BannerHome";
import { IoChevronForwardSharp } from "react-icons/io5";

const Home = ({ data }) => {
  const { locale, setLocale } = useTranslation();

  let dataOne = data.filter((dt) => dt.lang === locale)[0];

  const [frontmatter, setFrontmatter] = useState(dataOne);

  let { banner, section } = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

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
  }, [locale, data]);

  return (
    <Base>
      <section className="section bg-primary">
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg lg:h-[450px]">
            <div className="row">
              <div className="col-12 lg:col-6">
                <div className="banner-content z-20">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                  <div className={`banner-link`}>
                    <span className="text-[1rem] text-primary font-medium inline tracking-normal">
                      $ npm install –g sfile
                    </span>
                    <span className="text-[#292d33] text-[1rem] ml-1">
                      {`//`}
                      {markdownify(
                        banner.installation_tools,
                        "h6",
                        "opacity-1 text-[#292d33] text-[1rem] font-medium inline",
                      )}
                    </span>
                    <span className="pl-3 text-[#ff941a] text-[1rem] break-keep">
                      <Link href="/apis">
                        {markdownify(
                          banner.usage,
                          "h6",
                          "text-[#ff941a] font-medium inline",
                        )}
                        <IoChevronForwardSharp className="inline-flex -mt-1 h4" />
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="banner-img flex col-12 lg:col-6 opacity-0 justify-center items-center px-0 lg:right-0 overflow-hidden">
                <div className="relative flex">
                  <BannerHome />
                </div>
              </div>
            </div>
          </div>
          <div className="row content-xl">
            <div className="flex justify-center items-center z-20">
              <div className="col-10 absolute md:col-12 container">
                <div className="bg-[url('/images/home/icon-search.png')] w-[19px] h-[19px] absolute ml-3 mt-6" />
                <input
                  className="search-input"
                  type="text"
                  aria-label="Search open source libraires."
                  placeholder={banner.search_bar_placeholder}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* React */}
      <section className="animate section pt-14">
        <div className="container flex justify-center">
          <div className="col-12 px-1">
            {markdownify(section.react.title, "h3", "section_title")}
            {markdownify(
              section.react.description,
              "text-base",
              "section_description",
            )}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    https://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    http://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.js
                  </li>
                  <li className="list-item">
                    http://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.min.js
                  </li>
                </ul>
              </Tab>
            </Tabs>
            <div className="online-store">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* Vue */}
      <section className="animate section tracking-normal">
        <div className="container flex justify-center">
          <div className="col-12 px-1">
            {markdownify(section.vue.title, "h3", "section_title")}
            {markdownify(section.vue.description, "text-base", "section_description")}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    https://cdn.staticfile.org/vue/3.3.4/vue.cis.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/vue/3.3.4/vue.cis.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    http://cdn.staticfile.org/vue/3.3.4/vue.cis.js
                  </li>
                  <li className="list-item">
                    http://cdn.staticfile.org/vue/3.3.4/vue.cis.min.js
                  </li>
                </ul>
              </Tab>
            </Tabs>
            <div className="online-store">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* Angular JS */}
      <section className="animate section tracking-normal">
        <div className="container flex justify-center">
          <div className="col-12 px-1">
            {markdownify(section.angular.title, "h3", "section_title")}
            {markdownify(
              section.angular.description,
              "text-base",
              "section_description",
            )}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    https://cdn.staticfile.org/angular.js/1.8.3/angular-csp.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/angular.js/1.8.3/angular-csp.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    http://cdn.staticfile.org/angular.js/1.8.3/angular-csp.js
                  </li>
                  <li className="list-item">
                    http://cdn.staticfile.org/angular.js/1.8.3/angular-csp.min.js
                  </li>
                </ul>
              </Tab>
            </Tabs>
            <div className="online-store">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* JQuery */}
      <section className="animate section tracking-normal">
        <div className="container flex justify-center pb-12">
          <div className="col-12 px-1">
            {markdownify(section.jquery.title, "h3", "section_title")}
            {markdownify(
              section.jquery.description,
              "text-base",
              "section_description",
            )}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    https://cdn.staticfile.org/jquery/3.7.0/jquery.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/jquery/3.7.0/jquery.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="home-tab-ul">
                  <li className="list-item">
                    http://cdn.staticfile.org/jquery/3.7.0/jquery.js
                  </li>
                  <li className="list-item">
                    http://cdn.staticfile.org/jquery/3.7.0/jquery.min.js
                  </li>
                </ul>
              </Tab>
            </Tabs>
            <div className="online-store">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
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
