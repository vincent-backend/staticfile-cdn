import { useEffect, useState } from "react";
import Image from "next/image";

import RankTableRow from "./RankTableRow";
import clsx from "clsx";

import { RecordCounts } from "constant";

const TopPlatforms = ({ section, fetch_data }) => {
  const [total, setTotal] = useState(fetch_data.length);
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(Math.ceil(total / countPerPage));
  const [data, setData] = useState(
    fetch_data.slice(
      currentPage * countPerPage,
      Math.min((currentPage + 1) * countPerPage, total),
    ),
  );

  const handleRecordSelect = (e) => {
    setCurrentPage(0);
    setCountPerPage(e.target.value);
    setPageCount(Math.ceil(total / e.target.value));
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount - 1 && pageCount > 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setData(
      fetch_data.slice(
        currentPage * countPerPage,
        Math.min((currentPage + 1) * countPerPage, total),
      ),
    );
  }, [currentPage, countPerPage, total, fetch_data]);

  return (
    <div className="border-[2px] border-border flex-col">
      <div className="flex flex-row h-[40px] ml-[12px] items-center">
        <Image
          alt="instructons_mark"
          src="/images/statistics/data_ic_Instructions.svg"
          width={16}
          height={16}
        />
        <span className="text-h6 md:text-base text-cgray ml-[6px]">
          {section.more_platform_data}
        </span>
      </div>
      <div className="flex overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-body h-[48px] text-h5 font-bold">
            <tr>
              <th className="text-center"></th>
              <th className="text-left whitespace-nowrap">{section.name}</th>
              <th className="text-right whitespace-nowrap px-3 md:px-4">{section.market_share}</th>
              <th className="text-right flex-row items-center pr-2 md:pr-4 whitespace-nowrap">
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
              <RankTableRow key={d.id} row={d} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex h-[48px] flex-row justify-between mx-2 md:mx-5 items-center">
        <div className="flex grow h-[48px] items-center">
          {section.record} {currentPage * countPerPage + 1} - {Math.min((currentPage + 1) * countPerPage, total)} of {total}
        </div>
        <div className="flex h-[48px] items-center mr-2 md:mr-10 ml-1">
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
          <button disabled={currentPage == 0} className={clsx("w-[24px] h-[24px] rounded-sm", 
            currentPage > 0 && "bg-[url('/images/statistics/data_ic_arrow_left.svg')]",
            currentPage == 0 && "bg-[url('/images/statistics/data_ic_arrow_left_dis.svg')]")}
            onClick={()=>handlePrevPage()}
            />
          <button disabled={currentPage == pageCount-1} className={clsx("w-[24px] h-[24px] rounded-sm",
            currentPage < pageCount - 1 && "bg-[url('/images/statistics/data_ic_arrow_right.svg')]",
            currentPage == pageCount - 1 && "bg-[url('/images/statistics/data_ic_arrow_right_dis.svg')]")}
            onClick={()=>handleNextPage()}
            />
        </div>
      </div>
    </div>
  );
};

export default TopPlatforms;
