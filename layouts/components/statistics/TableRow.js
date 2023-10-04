import Image from "next/image";
import clsx from "clsx";
import { useEffect, useRef } from "react";

const TableRow = ({row, id}) => {

    const style_tr = clsx("h-[48px]", id % 2 == 0 && "bg-[#fbfbfd]");

    const style_icon = useRef("flex w-[28px] h-[28px] bg-[url('" + row.img +"')]");

    useEffect(()=>{
        style_icon.current = "flex w-[28px] h-[28px] bg-[url('" + row.img +"')]";
    }, [row]);

    return(
    <tr className={style_tr}>
        <td>
            <div className="flex w-[24px] h-[24px] justify-center items-center border border-border mx-1 md:mx-4">
                {id}
            </div>
        </td>
        <td className="flex flex-row h-[48px] justify-start items-center">
            <Image alt={row.name} src={row.img} width={28} height={28} />
            <span className="ml-1 inline text-base md:text-h6">{row.name}</span>
        </td>
        <td className="text-right pr-2">
            {row.market_share}%
        </td>
        <td className={clsx("text-base md:text-6 text-right pr-2 md:pr-4",
                row.change < 0 && "text-danger",
                row.change >= 0 && "text-primary",)}>
            {row.change > 0 && `+`}
            {row.change}%
        </td>
    </tr>
    );
}

export default TableRow;