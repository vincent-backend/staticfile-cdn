import { useEffect, useState } from "react"; 
import { DataTypes } from "constant"; 
import { gsap } from "@lib/gsap"; 
import { markdownify } from "@lib/utils/textConverter"; 
import { staticData } from ".mock/statisticsData"; 
import { getDataFromContent } from "@lib/contentParser"; 
import useTranslation from "@hooks/useTranslation"; 
import Base from "@layouts/Baseof"; 
import BannerStatistics from "@layouts/components/banner/BannerStatistics"; 
import SCaption from "@layouts/components/statistics/SCaption"; 
import ChartArea from "@layouts/components/statistics/ChartArea"; 
import { CacheHitRate, GlobalDashboard } from "@layouts/components/statistics/Dashboard"; 
import RankTable from "@layouts/components/statistics/RankTable"; 
import { PopularTable } from "@layouts/components/statistics/PopularTable";

import { getNetworkData } from "@lib/data-load";

const Statistics = ({ static_data, network_data }) => {
  const { locale, setLocale } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(
    static_data.filter((dt) => dt.lang === locale)[0]
  );
  const { banner, section } = frontmatter;

  useEffect(() => {
    const ctx = gsap.context(() => {
      //frontmatter
      setFrontmatter(static_data.filter((dt) => dt.lang === locale)[0]);

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
    });

    return () => ctx.revert();
  }, [locale, static_data]);

  return (
    <Base>
      <section className="section bg-primary">
        <div className="container z-10 overflow-hidden">
          <div className="banner-bg md:h-[300px]">
            <div className="row">
              <div className="col-12 z-10 md:col-6">
                <div className="pt-20">
                  {markdownify(banner.title, "h3", "banner-title opacity-0")}
                  {markdownify(
                    banner.content,
                    "h5",
                    "banner-text text-justify opacity-0"
                  )}
                </div>
              </div>
              <div className="banner-img col-12 z-0 flex items-center justify-center px-0 opacity-0 md:col-6 lg:right-0">
                <div className="md:absolute md:mt-36">
                  <BannerStatistics />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container flex justify-center px-0">
          <div className="col-12 -mt-16 mb-12">
            <div className="container-main">
              <div className="div-statistics">
                {/* 全局数据 */}
                <div className="inner">
                  <SCaption caption={section.global_data} />
                  <div className="flex flex-col">
                    <div className="mx-0 flex flex-col justify-center md:flex-row md:space-x-6">
                      <div className="mt-6 w-full flex-col">
                        <div className="sub-caption">{section.request}</div>
                        {network_data.rslt &&
                          <GlobalDashboard
                          gType={DataTypes.REQUEST}
                          section={section}
                          network_data = {network_data.data.hits}
                        />
                        }
                      </div>
                      <div className="mt-6 w-full flex-col">
                        <div className="sub-caption">{section.bandwidth}</div>
                        {network_data.rslt &&
                        <GlobalDashboard
                          gType={DataTypes.BANDWIDTH}
                          section={section}
                          network_data = {network_data.data.bandwidth}
                        />
                        }
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col">
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
                    <div className="mt-6 flex-col">
                      <div className="sub-caption">
                        {section.requests_over_time}
                      </div>
                      <ChartArea section={section} />
                    </div>
                    <div className="mx-0 flex flex-col justify-center md:flex-row md:space-x-6">
                      <div className="mt-6 w-full flex-col">
                        <div className="sub-caption flex-row items-center">
                          <div className="flex">{section.top_platform}</div>
                          <div className="ml-4 flex border-[1px] border-border text-base font-normal text-dark">
                            {section.group_platform_version}
                          </div>
                        </div>
                        <RankTable
                          section={section}
                          fetch_data={staticData.platform_rank}
                        />
                      </div>
                      <div className="mt-6 min-h-[100px] w-full flex-col">
                        <div className="sub-caption flex-row items-center">
                          <div className="flex">{section.popular_browsers}</div>
                          <div className="ml-4 flex border-[1px] border-border text-base font-normal text-dark">
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
                  <div className="mt-6 flex min-h-[100px] flex-col">
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
  const static_data = await getDataFromContent("content/statistics");

  const network_data = await getNetworkData();

  return {
    props: {
      static_data,
      network_data
    },
  };
};
