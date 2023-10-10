import clsx from "clsx";
import { useEffect, useRef } from "react";

const PopularTableRow = ({ row }) => {
  const style_tr = clsx("popular-table-row");

  return (
    <tr className={style_tr} key={row.name}>
      <td className="whitespace-nowrap pl-2 md:pl-4">{row.name}</td>
      <td className="whitespace-nowrap px-3 md:px-4">{row.requests}</td>
      <td className="text-right whitespace-nowrap pr-2 md:pr-4">
        {row.bandwidth} TB
      </td>
    </tr>
  );
};

export default PopularTableRow;
