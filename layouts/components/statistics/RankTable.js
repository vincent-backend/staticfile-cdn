import { useEffect, useState } from "react";
import Image from "next/image";

import TableRow from "./TableRow";

import { RecordCounts } from "constant/Types";

import { PaginationNextButton, PaginationPrevButton } from "../buttons/PaginationButton";

const TopPlatforms = ({ section, fetch_data }) => {
  const [total, setTotal] = useState(fetch_data.length);
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(Math.ceil(total / countPerPage));
  const [fId, setFId] = useState(currentPage * countPerPage);
  const [lId, setLId] = useState(Math.min((currentPage + 1) * countPerPage, total));
  const [data, setData] = useState(fetch_data.slice(fId, lId));

  const handleRecordSelect = (e) => {
    setCurrentPage(0);
    setCountPerPage(e.target.value);
    setPageCount(Math.ceil(total / e.target.value));
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pageCount-1 && pageCount > 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    setFId(currentPage * countPerPage);
    setLId(Math.min((currentPage + 1) * countPerPage), total);
    setData(fetch_data.slice(fId, lId));
  }, [currentPage, countPerPage, fId, lId, total, fetch_data]);

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
          {section.more_platform_data}
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
            {data.map((d) => (
              <TableRow key={d.id} row={d} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex h-[48px] flex-row justify-between mx-2 md:mx-5 items-center">
        <div className="flex grow h-[48px] items-center">
          {section.record} {fId + 1}-{Math.min(lId, total)} of {total}
        </div>
        <div className="flex h-[48px] items-center mr-2 md:mr-10">
          <span>{section.display}: </span>
          <select
            className="border-none active:border-none"
            defaultValue={countPerPage}
            onChange={handleRecordSelect}
          >
            {RecordCounts.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[60px] h-[48px] justify-end space-x-[8px] items-center">
          <PaginationPrevButton isEnabled={ currentPage > 0 } callback={()=>handlePrevPage} />
          <PaginationNextButton isEnabled={ currentPage < pageCount-1 && pageCount > 1} callback={()=>handleNextPage} />
        </div>
      </div>
    </div>
  );
};

export default TopPlatforms;
