import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  
  let { banner, section} = frontmatter;

  useEffect(() => {
    //frontmatter
    setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

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
  }, [locale, data]);

  return (
    <Base>
      <section className="section bg-[#1cbc9c]">
        <div className="container-banner">
          <div className="relative banner-bg z-10">
            <div className="row overflow-hidden rounded-2xl">
              <div className="row relative pb-10">
                <div className="sm:col-12 md:col-6 z-10">
                  <div className="banner-content col-12 pt-10 pb-10 pr-10 pl-10 md:pr-6 md:pl-20 md:pl-15 md:pt-20">
                    {markdownify(banner.title, "h3", "banner-title opacity-0")}
                    {markdownify(banner.content, "h5", "banner-text text-justify opacity-0")}
                    <div className={`banner-link opacity-0 ${locale == "en" ? "w-[400px]" : "w-[350px]"}`}>
                      <span>$ npm install –g sfile </span>
                      <span className="text-[#292d33]">{`//`}{markdownify(banner.installation_tools, "h6", "opacity-1 text-[#292d33] font-medium inline")}</span>
                      <span className="pl-3 text-primary">
                        <Link href="/apis">{markdownify(banner.usage, "h6", "opacity-1 text-primary font-medium inline")}
                          <IoChevronForwardSharp className="inline-flex align-middle" />
                        </Link>
                      </span>
                    </div>
                  </div>

                </div>
                <div className="sm:col-12 md:col-6 banner-img opacity-0">
                  <BannerHome />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="justify-center col-10 absolute -bottom-9 overflow-visible">
                <svg width="34" height="34" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                </svg>
                <input className="search-input" type="text" aria-label="Filter projects" placeholder="请输入开源车名称..." />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* React */}
      <section className="animate section">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.react.title, "h3", "section_title")}
            {markdownify(section.react.description, "h5", "section_description")}
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
          </div>
        </div>
      </section>
      {/* Vue */}
      <section className="animate section">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.vue.title, "h3", "section_title")}
            {markdownify(section.vue.description, "h5", "section_description")}
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
          </div>
        </div>
      </section>
      {/* Angular JS */}
      <section className="animate section">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.angular.title, "h3", "section_title")}
            {markdownify(section.angular.description, "h5", "section_description")}
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
          </div>
        </div>
      </section>
      {/* JQuery */}
      <section className="animate section">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.jquery.title, "h3", "section_title")}
            {markdownify(section.jquery.description, "h5", "section_description")}
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
      data
    },
  };
};