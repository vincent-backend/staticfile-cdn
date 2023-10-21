import clsx from "clsx";
import { useEffect, useState } from "react";
import { DataTypes, SiteNames } from "constant";
import { gsap } from "@lib/gsap";
import { num2DataSize } from "@lib/utils/dataFormat";

import theme from "@config/theme.json";

import { staticData } from ".mock/statisticsData";
import ProgressBar from "@components/progressbar";

import Image from "next/image";
import NetworkIcon from "./NetworkIcon";

const style_icon_huawei =
  "w-[26px] h-[26px] bg-[url('/images/statistics/data_ic_huawei.svg')]";
const style_icon_ali =
  "w-[26px] h-[26px] bg-[url('/images/statistics/data_ic_ali.svg')]";
const style_icon_tencent =
  "w-[26px] h-[26px] bg-[url('/images/statistics/data_ic_tencent.svg')]";

export const GlobalDashboard = ({ gType, section, network_data }) => {
  const [data, setData] = useState(network_data);

  const [total, setTotal] = useState(parseFloat(data.total));
  const [prev, setPrev] = useState(parseFloat(data.prev.total));
  const overallRate = ((total-prev) / prev * 100).toFixed(1);

  const dataArray = data.providers.sort((a, b) => (a.total > b.total ? -1 : 1));

  const style_topIcon = clsx({
    "w-[36px] h-[36px] bg-[url('/images/statistics/data_ic_request.svg')]":
      gType === DataTypes.REQUEST,
    "w-[36px] h-[36px] bg-[url('/images/statistics/data_ic_bandwidth.svg')]":
      gType === DataTypes.BANDWIDTH,
  });

  const [progColors, setProgColors] = useState(theme.colors.default.network_color);

  return (
    <div className="flex-col h-80 md:h-[315px] border-[2px] border-border">
      <div className="h-20 md:h-[90px] bg-body flex flex-row items-center px-2 md:px-5">
        <div className={style_topIcon} />
        <span className="ml-3 text-h4 md:text-h3 font-bold leading-7 tracking-tighter">
          {gType == DataTypes.REQUEST &&
          data.total.toLocaleString("en-US").replaceAll(",", " ")
          }
          {gType == DataTypes.BANDWIDTH &&
          num2DataSize(data.total)
          }
        </span>
        {gType == DataTypes.BANDWIDTH && (
          <span className="ml-1 text-h4 md:text-h3 font-bold">{data.unit}</span>
        )}
        <div className="flex grow justify-end">
          <div className="flex flex-col items-center justify-center min-w-[60px]">
            <span
              className={clsx({
                "flex font-bold text-h6 text-center pb-0.5": true,
                "text-danger": overallRate < 0,
                "text-primary": overallRate >= 0,
              })}
            >
              {overallRate > 0 && `+`}
              {overallRate}%
            </span>
            <div className="flex text-base text-center">{data.status}</div>
          </div>
        </div>
      </div>
      <div className="flex-col h-60 md:h-[225px] px-2 md:px-5">
        {dataArray.map((d, index) => (
          <div
            className="flex flex-row h-1/3 items-center text-dark"
            key={d.name}
          >
            <div className="flex w-[58%] items-center">
              {/*Icon*/}
              <NetworkIcon sitename={d.name} />

              {/*Caption && Total*/}
              <div className="flex flex-col lg:grow lg:flex-row ml-2 items-start lg:items-center justify-between">
                <div className="flex lg:w-1/3 text-base font-bold">
                  {d.name}
                </div>
                <div className="flex grow">
                  <div className="text-left w-full pl-0 lg:pl-[20%] pr-2 text-base tracking-tighter">
                    {gType == DataTypes.REQUEST && 
                    d.total.toLocaleString("en-US").replaceAll(",", " ")
                    }
                    {gType == DataTypes.BANDWIDTH && 
                    num2DataSize(d.total)
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[42%] items-center">
              <div className="w-1/2 justify-center mr-2">
                <ProgressBar progress={(d.total * 100 / total).toFixed(0)} color={progColors[index]}/>
              </div>
              <div
                className={clsx(
                  "flex w-1/2 justify-end text-h6 font-normal",
                  (d.total-d.prev.total)*100/d.prev.total >= 0 && "text-primary",
                  (d.total-d.prev.total)*100/d.prev.total < 0 && "text-danger",
                )}
              >
                {(d.total-d.prev.total)*100/d.prev.total > 0 && `+`}
                {((d.total-d.prev.total)*100/d.prev.total).toFixed(1)}%
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
