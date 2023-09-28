import useTranslation from "@hooks/useTranslation";
import BannerStatistics from "@layouts/components/banner/BannerStatistics";
import Base from "@layouts/Baseof";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import SCaption from "@layouts/components/statistics/SCaption";
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
                  <SCaption caption="全局数据" />
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:space-x-6 justify-center mx-0 md:mx-3">
                      <div className="col-12 md:col-6 bg-slate-400 min-h-[100px] mt-6">
                        div #1
                      </div>
                      <div className="col-12 md:col-6 bg-slate-400 min-h-[100px] mt-6">
                        div #2
                      </div>
                    </div>
                    <div className="flex bg-slate-200 min-h-[100px] mt-6">
                      div #3
                    </div>
                  </div>
                </div>
                {/* 网络数据 */}
                <div className="inner">
                  <SCaption caption="网络数据" />
                  <div className="flex flex-col">
                    <div className="flex bg-slate-200 min-h-[100px] mt-6">
                      chart
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6 justify-center mx-0 md:mx-3">
                      <div className="col-12 md:col-6 bg-slate-400 min-h-[100px] mt-6">
                        platform rank
                      </div>
                      <div className="col-12 md:col-6 bg-slate-400 min-h-[100px] mt-6">
                        webbrowser rank
                      </div>
                    </div>
                  </div>
                </div>
                {/* 项目统计 */}
                <div className="inner">
                  <SCaption caption="项目统计" />
                  <div className="bg-slate-400 min-h-[100px] mt-6"></div>
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
