import { useEffect, useState } from "react";
import clsx from "clsx";

import { SiteNames } from "constant/Types";

const ToggleButton = ({site, checked, callback}) => {

    const style_icon_open = site == SiteNames.Tencent ? 
            "bg-[url('/images/statistics/data_Button1_open.svg')]":
            "bg-[url('/images/statistics/data_Button2_open.svg')]";

    const style_icon_close = "bg-[url('/images/statistics/data_Button_close.svg')]";

    return(
        <div className={clsx("w-[42px] h-[22px] cursor-pointer",
            checked && style_icon_open,
            !checked && style_icon_close)}
            onClick={callback()}
        />
    );
}

export default ToggleButton;