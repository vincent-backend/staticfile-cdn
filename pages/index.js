/* eslint-disable react/jsx-no-comment-textnodes */
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Tabs from "@layouts/shortcodes/Tabs";
import Tab from "@layouts/shortcodes/Tab";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

const Home = ({ banner, section }) => {

  useEffect(() => {
    const ctx = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const header = document.querySelector(".header");
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

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: true,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base>
      <section className="section bg-[#1cbc9c] banner pt-0">
        <div className="container-xl">
          <div className="relative banner-bg z-10">
            <div className="row overflow-hidden rounded-2xl">
              <div className="row relative pb-10">
                <div className="sm:col-12 md:col-6">
                  <div className="banner-content col-12 pt-10 pb-10 pr-10 pl-10 md:pr-6 md:pl-20 md:pl-15 md:pt-20">
                    {markdownify(banner.subtitle, "h3", "banner-title")}
                    {markdownify(banner.content, "h5", "banner-text text-justify")}
                    <div className="banner-link">
                      <span>$ npm install –g sfile </span>
                      <span className="text-[#292d33]">//安装工具</span>
                      <span className="pl-3 text-primary"><Link href="/apis">使用说明<IoChevronForwardSharp className="inline-flex align-middle" /></Link></span>
                    </div>
                  </div>

                </div>
                <div className="sm:col-12 md:col-6">
                  <ImageFallback
                    className="banner-img opacity-0"
                    src="/images/banner.png"
                    width="600"
                    height="250"
                    priority={true}
                    alt=""
                  />
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
                <ul role="list" className="list-image-none">
                  <li className="list-item">
                    https://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/react/18.2.0/cjs/react-jsx-dev-runtime.development.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
              <ul role="list" className="list-image-none">
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
          <div className="col-10">
            {markdownify(section.vue.title, "h3", "section_title")}
            {markdownify(section.vue.description, "h5", "section_description")}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="list-image-none">
                  <li className="list-item">
                    https://cdn.staticfile.org/vue/3.3.4/vue.cis.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/vue/3.3.4/vue.cis.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="list-image-none">
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
          <div className="col-10">
            {markdownify(section.angular.title, "h3", "section_title")}
            {markdownify(section.angular.description, "h5", "section_description")}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="list-image-none">
                  <li className="list-item">
                    https://cdn.staticfile.org/angular.js/1.8.3/angular-csp.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/angular.js/1.8.3/angular-csp.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="list-image-none">
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
          <div className="col-10">
            {markdownify(section.jquery.title, "h3", "section_title")}
            {markdownify(section.jquery.description, "h5", "section_description")}
            <Tabs>
              <Tab name="HTTPS">
                <ul role="list" className="list-image-none">
                  <li className="list-item">
                    https://cdn.staticfile.org/jquery/3.7.0/jquery.js
                  </li>
                  <li className="list-item">
                    https://cdn.staticfile.org/jquery/3.7.0/jquery.min.js
                  </li>
                </ul>
              </Tab>
              <Tab name="HTTP">
                <ul role="list" className="list-image-none">
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
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, section} = frontmatter;

  return {
    props: {
      banner: banner,
      section: section
    },
  };
};
