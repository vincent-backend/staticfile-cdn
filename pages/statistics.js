import useTranslation from "@hooks/useTranslation";
import BannerStatistics from "@layouts/components/banner/BannerStatistics";
import Base from "@layouts/Baseof";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";

import { useEffect, useRef, useState } from "react";

const Statistics = ({ data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    data.filter((dt) => dt.lang === locale)[0],
  );
  const { banner, section } = frontmatter;

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
      <section className="section bg-primary">
        <div className="container-banner">
          <div className="relative banner-bg overflow-hidden">
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
                <BannerStatistics />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="flex justify-center -mt-40 container-xl">
          <div className="col-12">
            <div className="container-main">
              <div className="div-information">
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
      data,
    },
  };
};
