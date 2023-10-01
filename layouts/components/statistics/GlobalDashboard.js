import { staticData } from "../../../.mock/statisticsData";

import clsx from "clsx";

import { useEffect, useState } from "react";

import { DataTypes, SiteNames } from "constant/Types";

export const GlobalDashboard1 = ({ gType, section }) => {

    const { global_data } = staticData;
    const [ data, setData ] = useState(gType == 'request' ? global_data.request : global_data.bandwidth);

    const dataArray = data.data.sort((a, b) => a.total > b.total ? -1 : 1);


    const style_topIcon = clsx({"w-[36px] h-[26px] bg-[url('/images/statistics/request.png')]" : gType === DataTypes.REQUEST,
                       "w-[31px] h-[30px] bg-[url('/images/statistics/bandwidth.png')]" : gType === DataTypes.BANDWIDTH});

    const style_icon_huawei = "w-[22px] h-[17px] bg-[url('/images/statistics/huawei.png')]";
    const style_icon_ali = "w-[24px] h-[14px] bg-[url('/images/statistics/ali.png')]";
    const style_icon_tencent = "w-[27px] h-[21px] bg-[url('/images/statistics/tencent.png')]";

    return (
        <div className="flex-col h-80 md:h-[315px] border-[2px] border-border">
            <div className="h-20 md:h-[90px] bg-body flex flex-row items-center px-2 md:px-5">
                <div className={style_topIcon} />
                <span className="ml-3 text-h4 md:text-h3 font-bold leading-7 tracking-tighter">{data.total.toLocaleString('en-US').replaceAll(',', ' ')}</span>
                {
                    gType == DataTypes.BANDWIDTH &&
                    <span className="ml-1 text-h4 md:text-h3 font-bold">{data.unit}</span>
                }
                <div className="flex grow justify-end">
                    <div className="flex flex-col items-center justify-center min-w-[60px]">
                        <span className={clsx({"flex font-bold text-h6 text-center pb-0.5": true,
                                                "text-danger": data.rate < 0,
                                                "text-primary": data.rate >= 0})}>{data.rate > 0 && `+`}{data.rate}%</span>
                        <div className="flex text-base text-center">{data.status}</div>
                    </div>
                </div>
            </div>
            <div className="flex-col h-60 md:h-[225px] px-2 md:px-5">
            {dataArray.map((d) => 
                <div className="flex flex-row h-1/3 items-center" key={d.site}>
                    <div className="flex w-1/2 items-center">
                        {/*Icon*/}
                        <div className={clsx(d.site == SiteNames.Tencent && style_icon_tencent, 
                            d.site == SiteNames.Ali && style_icon_ali, 
                            d.site == SiteNames.Huawei && style_icon_huawei)}
                        />
                        {/*Caption && Total*/}
                        <div className="flex flex-col md:flex-row ml-2 items-start md:items-center">
                            <span className="flex text-base font-bold text-dark">
                                {d.site == SiteNames.Ali && section.ali}
                                {d.site == SiteNames.Tencent && section.tencent}
                                {d.site == SiteNames.Huawei && section.huawei}
                            </span>
                            <div className="flex justify-end text-left md:text-right text-base text-dark tracking-tighter">
                                {d.total.toLocaleString('en-US').replaceAll(',', ' ')}
                            </div>
                        </div>
                    </div>
                    <div className="flex w-auto">
                        sdf
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export const GlobalDashboard2 = () => {
    return (
        <div className="flex flex-col bg-blue-400">

        </div>
    );
}