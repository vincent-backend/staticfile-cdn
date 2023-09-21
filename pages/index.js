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
        <div className="container-banner z-10 overflow-hidden">
          <div className="banner-bg">
            <div className="row pb-4 ">
              <div className="col-12 lg:col-6">
                <div className="banner-content">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                  <div className={`banner-link opacity-0 w-fit mt-5`}>
                    <span className=" h5 text-primary font-medium inline tracking-normal">
                      $ npm install –g sfile{" "}
                    </span>
                    <span className="text-[#292d33]">
                      {`//`}
                      {markdownify(
                        banner.installation_tools,
                        "h6",
                        "opacity-1 text-[#292d33] font-medium inline",
                      )}
                    </span>
                    <span className="pl-3 text-[#ff941a] break-keep">
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
              <div className="banner-img">
                <BannerHome />
              </div>
            </div>
          </div>
          <div className="row max-w-[1440px]">
            <div className="flex justify-center items-center z-20">
              <div className="col-10 absolute mt-4 lg:col-9 xl:col-8 2xl:col-7">
                <svg
                  width="34"
                  height="34"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
                <input
                  className="search-input"
                  type="text"
                  aria-label="Filter projects"
                  placeholder={banner.search_bar_placeholder}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* React */}
      <section className="animate section tracking-normal">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.react.title, "h3", "section_title")}
            {markdownify(
              section.react.description,
              "h5",
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
            <div className="pt-3 h5 font-medium text-primary">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* Vue */}
      <section className="animate section tracking-normal">
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
            <div className="pt-3 h5 font-medium text-primary">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* Angular JS */}
      <section className="animate section tracking-normal">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.angular.title, "h3", "section_title")}
            {markdownify(
              section.angular.description,
              "h5",
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
            <div className="pt-3 h5 font-medium text-primary">
              <a href={section.react.href}>{section.online_store}</a>
            </div>
          </div>
        </div>
      </section>
      {/* JQuery */}
      <section className="animate section tracking-normal">
        <div className="container-xl flex justify-center">
          <div className="col-12 pl-1 pr-1 md:col-10">
            {markdownify(section.jquery.title, "h3", "section_title")}
            {markdownify(
              section.jquery.description,
              "h5",
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
            <div className="pt-3 h5 font-medium text-primary">
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
