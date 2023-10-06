import { useEffect, useState } from "react";
import Image from "next/image";

import { staticData } from ".mock/statisticsData";
import TableRow from "./TableRow";

const PopularBrowsers = ({ section }) => {
  const [data, setData] = useState(staticData.platform_rank);

  return (
    <div className="border-[2px] border-border flex-col">
      <div className="flex flex-row h-[40px] ml-[12px] items-center">
        <Image
          alt="instructons_mark"
          src="/images/statistics/data_ic_Instructions.svg"
          width={16}
          height={16}
        />
        <span className="text-h6 md:text-base text-text_gray ml-[6px]">
          {section.more_browser_data}
        </span>
      </div>
      <div className="flex">
        <table className="table-auto w-full">
          <thead className="bg-body h-[48px] text-h5 font-bold">
            <tr>
              <th className="text-center"></th>
              <th className="text-left">{section.name}</th>
              <th className="text-right pr-2">{section.market_share}</th>
              <th className="text-right flex-row items-center pr-2 md:pr-4">
                <span className="mr-1">{section.change}</span>
                <Image
                  alt="instructons_mark"
                  src="/images/statistics/data_ic_Instructions.svg"
                  width={16}
                  height={16}
                  className="inline"
                />
              </th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {data.map((d, id) => (
              <TableRow key={id} row={d} id={id + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularBrowsers;
