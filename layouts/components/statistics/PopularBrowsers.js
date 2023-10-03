import { useEffect } from "react";
import Image from "next/image";

const PopularBrowsers = ({section}) => {
    return (
        <div className="h-40 border-[2px] border-border flex-col">
            <div className="flex flex-row h-[40px] ml-[12px] items-center">
                <Image alt="instructons_mark" src="/images/statistics/data_ic_Instructions.svg" width={16} height={16} />
                <span className="text-h6 md:text-base text-text_gray ml-[6px]">{section.more_browser_data}</span>
            </div>
            <div className="flex">
                <table className="table w-full">
                    <thead className="bg-body h-[48px] text-h5 font-bold">
                        <tr>
                            <th className="text-center"></th>
                            <th className="text-center">{section.name}</th>
                            <th className="text-center">{section.market_share}</th>
                            <th className="text-center flex-row items-center">
                                <span className="mr-1">{section.change}</span>
                                <Image alt="instructons_mark" src="/images/statistics/data_ic_Instructions.svg" width={16} height={16} className="inline" />
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
      );
};

export default PopularBrowsers;
