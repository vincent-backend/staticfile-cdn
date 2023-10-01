import { staticData } from "../../../.mock/statisticsData";

import clsx from "clsx";

import { useEffect, useState } from "react";

import { DataTypes, SiteNames } from "constant/Types";

import { gsap } from "@lib/gsap";

const style_icon_huawei =
  "w-[22px] h-[17px] bg-[url('/images/statistics/huawei.png')]";
const style_icon_ali =
  "w-[24px] h-[14px] bg-[url('/images/statistics/ali.png')]";
const style_icon_tencent =
  "w-[27px] h-[21px] bg-[url('/images/statistics/tencent.png')]";

export const GlobalDashboard = ({ gType, section }) => {
  const { global_data } = staticData;
  const [data, setData] = useState(
    gType == "request" ? global_data.request : global_data.bandwidth,
  );

  const dataArray = data.data.sort((a, b) => (a.total > b.total ? -1 : 1));

  const style_topIcon = clsx({
    "w-[36px] h-[26px] bg-[url('/images/statistics/request.png')]":
      gType === DataTypes.REQUEST,
    "w-[31px] h-[30px] bg-[url('/images/statistics/bandwidth.png')]":
      gType === DataTypes.BANDWIDTH,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        `.${gType}-prog-ali`,
        { width: "0%" },
        {
          width: `${
            (dataArray.find((d) => d.site == SiteNames.Ali).total /
              data.total) *
            100
          }%`,
          duration: 0.5,
          delay: 0.5,
        },
      )
        .fromTo(
          `.${gType}-prog-tencent`,
          { width: "0%" },
          {
            width: `${
              (dataArray.find((d) => d.site == SiteNames.Tencent).total /
                data.total) *
              100
            }%`,
            duration: 0.5,
          },
          ">-0.5",
        )
        .fromTo(
          `.${gType}-prog-huawei`,
          { width: "0%" },
          {
            width: `${
              (dataArray.find((d) => d.site == SiteNames.Huawei).total /
                data.total) *
              100
            }%`,
            duration: 0.5,
          },
          ">-0.5",
        );
    });

    return () => ctx.revert();
  }, [dataArray, gType, data]);

  return (
    <div className="flex-col h-80 md:h-[315px] border-[2px] border-border">
      <div className="h-20 md:h-[90px] bg-body flex flex-row items-center px-2 md:px-5">
        <div className={style_topIcon} />
        <span className="ml-3 text-h4 md:text-h3 font-bold leading-7 tracking-tighter">
          {data.total.toLocaleString("en-US").replaceAll(",", " ")}
        </span>
        {gType == DataTypes.BANDWIDTH && (
          <span className="ml-1 text-h4 md:text-h3 font-bold">{data.unit}</span>
        )}
        <div className="flex grow justify-end">
          <div className="flex flex-col items-center justify-center min-w-[60px]">
            <span
              className={clsx({
                "flex font-bold text-h6 text-center pb-0.5": true,
                "text-danger": data.rate < 0,
                "text-primary": data.rate >= 0,
              })}
            >
              {data.rate > 0 && `+`}
              {data.rate}%
            </span>
            <div className="flex text-base text-center">{data.status}</div>
          </div>
        </div>
      </div>
      <div className="flex-col h-60 md:h-[225px] px-2 md:px-5">
        {dataArray.map((d) => (
          <div
            className="flex flex-row h-1/3 items-center text-dark"
            key={d.site}
          >
            <div className="flex w-[58%] items-center">
              {/*Icon*/}
              <div
                className={clsx(
                  d.site == SiteNames.Tencent && style_icon_tencent,
                  d.site == SiteNames.Ali && style_icon_ali,
                  d.site == SiteNames.Huawei && style_icon_huawei,
                )}
              />
              {/*Caption && Total*/}
              <div className="flex flex-col lg:grow lg:flex-row ml-2 items-start lg:items-center justify-between">
                <span className="flex text-base font-bold">
                  {d.site == SiteNames.Ali && section.ali}
                  {d.site == SiteNames.Tencent && section.tencent}
                  {d.site == SiteNames.Huawei && section.huawei}
                </span>
                <div className="flex grow">
                  <div className="text-left w-full pl-0 lg:pl-[20%] pr-2 text-base tracking-tighter">
                    {d.total.toLocaleString("en-US").replaceAll(",", " ")}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[42%] items-center">
              <div className="w-1/2 justify-center mr-2">
                <div className="h-[5px] rounded-sm max-w-[110px] mx-auto bg-body">
                  <div
                    className={clsx(
                      `flex h-[5px] rounded-sm w-[0%] ${gType}-prog-${d.site}`,
                      d.site == SiteNames.Ali && "bg-[#ff941a]",
                      d.site == SiteNames.Huawei && "bg-danger",
                      d.site == SiteNames.Tencent && "bg-[#8d04c8]",
                    )}
                  />
                </div>
              </div>
              <div
                className={clsx(
                  "flex w-1/2 justify-end text-h6 font-normal",
                  d.rate >= 0 && "text-primary",
                  d.rate < 0 && "text-danger",
                )}
              >
                {d.rate > 0 && `+`}
                {d.rate}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CacheHitRate = ({ section }) => {
  const { cache_hit_rate } = staticData.global_data;

  return (
    <div className="flex flex-col md:flex-row h-[270px] md:h-24 justify-between space-x-0 space-y-3 md:space-x-6 md:space-y-0">
      {cache_hit_rate.map((d) => (
        <div
          className="flex flex-row md:flex-col h-full w-full bg-body justify-between md:justify-center items-center px-2 md:px-5 py-3"
          key={d.site}
        >
          <div className="flex flex-row items-center">
            {/*Icon*/}
            <div
              className={clsx(
                d.site == SiteNames.Tencent && style_icon_tencent,
                d.site == SiteNames.Ali && style_icon_ali,
                d.site == SiteNames.Huawei && style_icon_huawei,
              )}
            />
            {/*Site*/}
            <span className="flex ml-2 text-base font-bold text-black">
              {d.site == SiteNames.Ali && section.ali}
              {d.site == SiteNames.Tencent && section.tencent}
              {d.site == SiteNames.Huawei && section.huawei}
            </span>
          </div>
          <div className="flex text-h5 font-normal md:font-bold text-center text-black">
            {d.rate}%
          </div>
        </div>
      ))}
    </div>
  );
};
