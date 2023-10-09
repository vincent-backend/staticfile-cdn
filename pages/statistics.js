import useTranslation from "@hooks/useTranslation";
import BannerStatistics from "@layouts/components/banner/BannerStatistics";
import Base from "@layouts/Baseof";
import { getDataFromContent } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import SCaption from "@layouts/components/statistics/SCaption";
import { useEffect, useRef, useState } from "react";

import { staticData } from ".mock/statisticsData";
import { DataTypes } from "constant";

import ChartArea from "@layouts/components/statistics/ChartArea";

import {
  CacheHitRate,
  GlobalDashboard,
} from "@layouts/components/statistics/GlobalDashboard";
import RankTable from "@layouts/components/statistics/RankTable";
import { PopularTable } from "@layouts/components/statistics/PopularTable";

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
                  <SCaption caption={section.global_data} />
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:space-x-6 justify-center mx-0">
                      <div className="flex-col w-full mt-6">
                        <div className="sub-caption">{section.request}</div>
                        <GlobalDashboard
                          gType={DataTypes.REQUEST}
                          section={section}
                        />
                      </div>
                      <div className="flex-col w-full mt-6">
                        <div className="sub-caption">{section.bandwidth}</div>
                        <GlobalDashboard
                          gType={DataTypes.BANDWIDTH}
                          section={section}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-6">
                      <div className="sub-caption">
                        {section.cache_hit_rate}
                      </div>
                      <CacheHitRate section={section} />
                    </div>
                  </div>
                </div>
                {/* 网络数据 */}
                <div className="inner">
                  <SCaption caption={section.network_data} />
                  <div className="flex flex-col">
                    <div className="flex-col mt-6">
                      <div className="sub-caption">
                        {section.requests_over_time}
                      </div>
                      <ChartArea section={section} />
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-6 justify-center mx-0">
                      <div className="flex-col w-full mt-6">
                        <div className="sub-caption flex-row items-center">
                          <div className="flex">{section.top_platform}</div>
                          <div className="flex ml-4 border-[1px] border-border text-base font-normal text-dark">
                            {section.group_platform_version}
                          </div>
                        </div>
                        <RankTable
                          section={section}
                          fetch_data={staticData.platform_rank}
                        />
                      </div>
                      <div className="flex-col w-full min-h-[100px] mt-6">
                        <div className="sub-caption flex-row items-center">
                          <div className="flex">{section.popular_browsers}</div>
                          <div className="flex ml-4 border-[1px] border-border text-base font-normal text-dark">
                            {section.group_browser_version}
                          </div>
                        </div>
                        <RankTable
                          section={section}
                          fetch_data={staticData.popular_browsers}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 项目统计 */}
                <div className="inner">
                  <SCaption caption="项目统计" />
                  <div className="flex flex-col min-h-[100px] mt-6">
                    <div className="sub-caption">
                      {section.most_popular_projects}
                    </div>
                    <PopularTable section={section} />
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

export const getStaticProps = async () => {
  const data = await getDataFromContent("content/statistics");

  return {
    props: {
      data,
    },
  };
};
