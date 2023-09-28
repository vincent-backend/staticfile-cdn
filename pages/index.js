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
        <div className="container overflow-hidden">
          <div className="banner-bg md:min-h-[450px]">
            <div className="row">
              <div className="relative col-12 md:col-6 z-10 pb-10">
                <div className="pt-20 md:pt-[108px]">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                  <div className={`banner-link`}>
                    <span className="text-primary inline tracking-normal">
                      $ npm install –g sfile
                    </span>
                    <span className="text-[#292d33] ml-1">
                      {`//`}
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
      </section>
      <section className="section">
      <div className="row content-xl h-[66px]">
            <div className="flex justify-center items-center -mt-[66px]">
              <div className="absolute container">
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
      </section>
      {/* React */}
      <section className="animate section">
        <div className="container flex justify-center">
          <div className="col-12 px-1">
            {markdownify(section.react.title, "h3", "section_title")}
            {markdownify(
              section.react.description,
              "h6",
              "section_description",
            )}

            <div className="flex flex-col relative mt-8">
              <div>
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
              <div className="absolute top-0 right-0">
                <Dropdown />
              </div>
            </div>

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
            {markdownify(section.vue.description, "h6", "section_description")}

            <div className="flex flex-col relative mt-8">
              <div>
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
              <div className="absolute top-0 right-0">
                <Dropdown />
              </div>
            </div>
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
              "h6",
              "section_description",
            )}

            <div className="flex flex-col relative mt-8">
              <div>
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
              <div className="absolute top-0 right-0">
                <Dropdown />
              </div>
            </div>
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
              "h6",
              "section_description",
            )}

            <div className="flex flex-col relative mt-8">
              <div>
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
              <div className="absolute top-0 right-0">
                <Dropdown />
              </div>
            </div>
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
