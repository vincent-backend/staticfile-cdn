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
      Math.min((currentPage + 1) * countPerPage, total)
    )
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
        Math.min((currentPage + 1) * countPerPage, total)
      )
    );
  }, [currentPage, countPerPage, total, fetch_data]);

  return (
    <div className="flex-col border-[2px] border-border">
      <div className="ml-[12px] flex h-[40px] flex-row items-center">
        <Image
          alt="instructons_mark"
          src="/images/statistics/data_ic_Instructions.svg"
          width={16}
          height={16}
        />
        <span className="text-cgray ml-[6px] text-h6 md:text-base">
          {section.more_platform_data}
        </span>
      </div>
      <div className="flex overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="h-[48px] bg-body text-h5 font-bold">
            <tr>
              <th className="text-center"></th>
              <th className="w-1/2 whitespace-nowrap text-left">
                {section.name}
              </th>
              <th className="w-1/4 whitespace-nowrap px-3 text-right md:px-4">
                {section.market_share}
              </th>
              <th className="w-1/4 flex-row items-center whitespace-nowrap pr-2 text-right md:pr-4">
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
            {data.map((d, index) => (
              <RankTableRow key={index} row={d} id={index+1} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-2 flex h-[48px] flex-row items-center justify-between md:mx-5">
        <div className="flex h-[48px] grow items-center">
          {section.record} {currentPage * countPerPage + 1} -{" "}
          {Math.min((currentPage + 1) * countPerPage, total)} of {total}
        </div>
        <div className="ml-1 mr-2 flex h-[48px] items-center md:mr-10">
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
        <div className="flex h-[48px] w-[60px] items-center justify-end space-x-[8px]">
          <button
            disabled={currentPage == 0}
            className={clsx(
              "h-[24px] w-[24px] rounded-sm",
              currentPage > 0 &&
                "bg-[url('/images/statistics/data_ic_arrow_left.svg')]",
              currentPage == 0 &&
                "bg-[url('/images/statistics/data_ic_arrow_left_dis.svg')]"
            )}
            onClick={() => handlePrevPage()}
          />
          <button
            disabled={currentPage == pageCount - 1}
            className={clsx(
              "h-[24px] w-[24px] rounded-sm",
              currentPage < pageCount - 1 &&
                "bg-[url('/images/statistics/data_ic_arrow_right.svg')]",
              currentPage == pageCount - 1 &&
                "bg-[url('/images/statistics/data_ic_arrow_right_dis.svg')]"
            )}
            onClick={() => handleNextPage()}
          />
        </div>
      </div>
    </div>
  );
};

export default TopPlatforms;
