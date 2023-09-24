import useTranslation from "@hooks/useTranslation";
import Base from "@layouts/Baseof";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import BannerAPI from "@layouts/components/banner/BannerAPI";

import { useEffect, useRef, useState } from "react";

const Apis = ({ data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    data.filter((dt) => dt.lang === locale)[0],
  );
  const { banner, api, faq } = frontmatter;

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
        );
    });

    return () => ctx.revert();
  }, [locale, data]);

  return (
    <Base>
    <section className="section bg-primary">
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg md:h-[300px]">
            <div className="row">
              <div className="col-12 md:col-6">
                <div className="pt-20">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                </div>
              </div>
              <div className="banner-img flex col-12 md:col-6 opacity-0 justify-center items-center px-0 lg:right-0">
                <div className="md:absolute md:mt-24">
                  <BannerAPI />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="flex justify-center container px-0">
          <div className="col-12 -mt-16 mb-12">
            <div className="container-main">
            <div className="div-api">
                <div className="">
                  {markdownify(api.title, "h3", "text-primary")}
                </div>
                <div className="">
                  {markdownify(
                    api.content,
                    "h4",
                    "pt-4 text-primary font-medium leading-normal",
                  )}
                </div>
                <h3 className="py-5">Comming soon</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Apis;

// for homepage data
export const getStaticProps = async () => {
  const data = await getDataFromContent("content/apis");

  return {
    props: {
      data,
    },
  };
};
