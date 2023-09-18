import useTranslation from "@hooks/useTranslation";
import BannerHome from "@layouts/components/banner/BannerHome";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";

import { useEffect, useRef, useState } from "react";

const Statistics = ({ data }) => {

  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(data.filter((dt) => dt.lang === locale)[0]);
  const { banner, section } = frontmatter;

  useEffect(() => {
    const ctx = gsap.context(() => {

      //frontmatter
      setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

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
  }, [locale]);

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
                  </div>
                </div>
                <div className="sm:col-12 md:col-6 banner-img opacity-0">
                  <BannerHome />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
      <div className="flex justify-center -mt-40">
              <div className="col-12 md:col-10 overflow-visible">
                <div className="relative bg-white rounded-xl ml-2 mr-2 pt-8 pb-8 pl-4 pr-4 text-justify z-20 min-h-[200px]">
                    <div className="pb-8">
                      <h3>Comming soon</h3>
                    </div>
                </div>
              </div>
            </div>
      </section>
    </Base>
  );
};

export default Statistics;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/statistics");

  return {
    props: {
      data
    },
  };
};
