import clsx from "clsx";
import { useEffect, useRef } from "react";

const PopularTableRow = ({ row }) => {
  const style_tr = clsx("h-[48px] odd:bg-white even:bg-[#fbfbfd]");

  return (
    <tr className={style_tr} key={row.name}>
      <td className="text-left whitespace-nowrap pl-2 md:pl-4">{row.name}</td>
      <td className="text-left whitespace-nowrap pl-2">{row.requests}</td>
      <td className="text-right whitespace-nowrap pr-2 md:pr-4">{row.bandwidth} TB</td>
    </tr>
  );
};

export default PopularTableRow;
