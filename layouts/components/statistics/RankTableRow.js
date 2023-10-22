import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import ImageFallback from "../ImageFallback";

const RankTableRow = ({ row, id }) => {

  const change = row.prev.share == 0 ? 0 : ((row.share - row.prev.share) * 100 / row.prev.share).toFixed(1);
  return (
    <tr className="rank-table-row">
      <td>
        <div className="id">{id}</div>
      </td>
      <td className="img">
        <ImageFallback alt={row.name.substring(0, 2).toUpperCase()} src={`/images/statistics/platforms/${row.name}.png`} 
                       fallback = "/images/statistics/platforms/Other.png" width={28} height={28} />
        <span className="name">{row.name}</span>
      </td>
      <td className="pr-2 text-right">{row.share.toFixed(2)}%</td>
      <td
        className={clsx(
          "pr-2 text-right text-base md:pr-4 md:text-h6",
          change < 0 && "text-danger",
          change >= 0 && "text-primary"
        )}
      >
        {change > 0 && `+`}
        {change}%
      </td>
    </tr>
  );
};

export default RankTableRow;
