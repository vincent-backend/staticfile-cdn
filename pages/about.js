import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import { getDataFromContent } from "@lib/contentParser";
import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import BannerAPI from "@layouts/components/banner/BannerAPI";

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
      <section className="section">
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg md:h-[300px]">
            <div className="row">
              <div className="col-12 md:col-6 z-10">
                <div className="pt-20">
                  {markdownify(
                    banner.title,
                    "h3",
                    "banner-title text-dark opacity-0",
                  )}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                </div>
              </div>
              <div className="banner-img flex col-12 md:col-6 opacity-0 justify-center items-center px-0 lg:right-0 z-0">
                <div className="md:absolute md:mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="flex justify-center container px-0">
          <div className="col-12 -mt-16 mb-12">
            <div className="container-main">
              {content.map((c, i) => (
                <div className="div-about" key={i}>
                  {markdownify(c.subtitle, "h5", "about-subtitle")}
                  {markdownify(c.description, "h6", "about-content")}
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
