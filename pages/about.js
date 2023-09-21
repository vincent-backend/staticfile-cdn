import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import BannerHome from "@layouts/components/banner/BannerHome";

import { useEffect, useRef, useState } from "react";

const About = ({ data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    data.filter((dt) => dt.lang === locale)[0],
  );
  const { banner, content, content1, content2 } = frontmatter;

  useEffect(() => {
    const ctx = gsap.context(() => {
      //frontmatter
      setFrontmatter(data.filter((dt) => dt.lang === locale)[0]);

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
        );
    });

    return () => ctx.revert();
  }, [locale, data]);

  return (
    <Base>
      <section className="section bg-primary ">
        <div className="container-banner">
          <div className="relative banner-bg z-10 overflow-hidden">
            <div className="row relative pb-10">
              <div className="col-12 lg:col-6 z-10">
                <div className="banner-content">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                </div>
              </div>
              <div className="banner-img">
                <BannerHome />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="flex justify-center -mt-40">
          <div className="col-12 md:col-11 lg:col-10">
            <div className="container-main">
              {content.map((c, i) => (
                <div className="div-information" key={i}>
                  {markdownify(c.subtitle, "h3", "about-subtitle")}
                  {markdownify(c.description, "h4", "about-content")}
                </div>
              ))}
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
  const data = await getDataFromContent("content/about");
  return {
    props: {
      data,
    },
  };
};
