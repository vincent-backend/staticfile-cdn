import { useEffect, useState } from "react";
import clsx from "clsx";

import { SiteNames } from "constant";

const ToggleButton = ({ site, checked, callback }) => {

  return (
    <button
      onClick={callback()}
      className={clsx("w-[42px] h-[22px] p-0 m-auto  rounded-full flex transition duration-200 shadow-2xl", 
      checked && `justify-end bg-green-500`, !checked && "justify-start bg-[#e8eaf1]")}
    >
      <span
        className={`bg-white rounded-full w-[16px] h-[16px] m-[3px] p-0 shadow-xl`}
      ></span>
    </button>
  );
};

export default ToggleButton;
