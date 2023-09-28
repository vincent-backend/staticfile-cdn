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
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg md:h-[300px]">
            <div className="row">
              <div className="col-12 md:col-6 z-10">
                <div className="pt-20">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0",
                  )}
                </div>
              </div>
              <div className="banner-img flex col-12 md:col-6 opacity-0 justify-center items-center px-0 lg:right-0 z-0">
                <div className="md:absolute md:mt-36">
                  <BannerStatistics />
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
              <div className="div-statistics">
                {/* 全局数据 */}
                <div className="inner">
                  <div className="flex flex-row items-end">
                    <div className="flex flex-col">
                    <div className="caption flex flex-row">全局数据</div>
                    <div className="flex flex-row bg-primary h-1 mt-2"></div>
                    </div>
                    <div className="flex grow bg-slate-200 h-[1px]">
                    </div>
                  </div>
                </div>
                {/* 网络数据 */}
                <div className="inner">
                  <div className="flex flex-row items-end">
                    <div className="flex flex-col">
                    <div className="caption flex flex-row">网络数据</div>
                    <div className="flex flex-row bg-primary h-1 mt-2"></div>
                    </div>
                    <div className="flex grow bg-slate-200 h-[1px]">
                    </div>
                  </div>
                </div>
                {/* 项目统计 */}
                <div className="inner">
                  <div className="flex flex-row items-end">
                    <div className="flex flex-col">
                    <div className="caption flex flex-row">项目统计</div>
                    <div className="flex flex-row bg-primary h-1 mt-2"></div>
                    </div>
                    <div className="flex grow bg-slate-200 h-[1px]">
                    </div>
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
