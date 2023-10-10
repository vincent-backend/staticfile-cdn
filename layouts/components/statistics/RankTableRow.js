import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef } from "react";

const RankTableRow = ({ row }) => {
 
  return (
    <tr className="rank-table-row">
      <td>
        <div className="id">
          {row.id}
        </div>
      </td>
      <td className="img">
        <Image alt={row.name} src={row.img} width={28} height={28} />
        <span className="name">
          {row.name}
        </span>
      </td>
      <td className="text-right pr-2">{row.market_share.toFixed(2)}%</td>
      <td
        className={clsx(
          "text-base md:text-h6 text-right pr-2 md:pr-4",
          row.change < 0 && "text-danger",
          row.change >= 0 && "text-primary",
        )}
      >
        {row.change > 0 && `+`}
        {row.change.toFixed(1)}%
      </td>
    </tr>
  );
};

export default RankTableRow;
