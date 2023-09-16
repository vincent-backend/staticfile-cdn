/* eslint-disable react/jsx-no-comment-textnodes */
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";

import { useEffect, useRef } from "react";

const About = ({ banner, content1, content2 }) => {


  useEffect(() => {
    const ctx = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const bannerContent = document.querySelector(".banner-content");
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
        )
        .fromTo(
          bannerContent,
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        )
        .fromTo(
          ".banner-bg",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base>
      <section className="section banner pt-0">
        <div className="container-xl">
          <div className="relative banner-bg justify-center items-center">
            <div className="absolute banner-content pt-10 pb-10 pr-10 pl-10 md:pr-6 md:pl-20 md:pl-15 md:pt-20 z-20">
                {markdownify(banner.title, "h3", "banner-title text-dark opacity-0")}
            </div>
            <div className="flex justify-center items-center overflow-hidden bg-[#1cbc9c]">
                <ImageFallback
                    className="banner-img opacity-0 "
                    src="/images/banner.png"
                    width="600"
                    height="250"
                    priority={true}
                    alt=""
                />
            </div>
            <div className="flex justify-center -mt-40">
              <div className="col-12 ml-3 mr-3 md:col-10 overflow-visible">
                <div className="relative bg-white rounded-xl pt-8 pb-8 pl-4 pr-4 text-justify z-20">
                    <div className="about-list pb-8">
                        {markdownify(content1.subtitle, "h3", "about-subtitle")}
                        {markdownify(content1.description, "h4", "about-content")}
                    </div>
                    <div className="about-list pb-8">
                        {markdownify(content2.subtitle, "h3", "about-subtitle")}
                        {markdownify(content2.description, "h4", "about-content")}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default About;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/about.md");
  const { frontmatter } = homepage;
  const { banner, content1, content2 } = frontmatter;

  return {
    props: {
      banner: banner,
      content1: content1,
      content2: content2
    },
  };
};
