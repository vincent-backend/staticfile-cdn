import { useEffect, useState } from "react";
import Image from "next/image";
import { RecordCounts } from "constant";
import { staticData } from ".mock/statisticsData";
import PopularTableRow from "./PopularTableRow";
import Paginations from "../Paginations";

export const PopularTable = ({ section }) => {
  const [fetch_data, setData] = useState(
    staticData.popular_projects.sort((a, b) => a.name - b.name)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(
    Math.ceil(fetch_data.length / countPerPage)
  );
  const [sortF1, setSortF1] = useState(true);
  const [sortF2, setSortF2] = useState(true);
  const [sortF3, setSortF3] = useState(true);

  const handleRecordSelect = (e) => {
    setCurrentPage(0);
    setCountPerPage(e.target.value);
    setPageCount(Math.ceil(fetch_data.length / e.target.value));
  };

  const handleSortF1 = (newSort) => {
    setSortF1(newSort);
    if (newSort) {
      setData(
        fetch_data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      );
    } else {
      setData(
        fetch_data.sort((a, b) => {
          return b.name.localeCompare(a.name);
        })
      );
    }
  };

  const handleSortF2 = (newSort) => {
    setSortF2(newSort);
    if (newSort) {
      setData(fetch_data.sort((a, b) => a.requests - b.requests));
    } else {
      setData(fetch_data.sort((a, b) => b.requests - a.requests));
    }
  };

  const handleSortF3 = (newSort) => {
    setSortF3(newSort);
    if (newSort) {
      setData(fetch_data.sort((a, b) => a.bandwidth - b.bandwidth));
    } else {
      setData(fetch_data.sort((a, b) => b.bandwidth - a.bandwidth));
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {}, []);

  return (
    <div className="flex-col">
      <div className="flex">
        <div className="mr-2 flex h-[48px] items-center text-h6 md:mr-10">
          <span>Show: </span>
          <select
            className="mx-1 rounded-sm border-none bg-body active:border-none"
            defaultValue={countPerPage}
            onChange={handleRecordSelect}
          >
            {RecordCounts.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
      </div>
      <div className="flex overflow-x-auto">
        <table className="min-w-full">
          <thead className="h-[48px] bg-body text-h5 font-bold">
            <tr>
              <th className="h-[48px] w-1/2 whitespace-nowrap pl-2 md:pl-4">
                <span className="text-left">{section.item_name}</span>
                <button
                  className="px-2 text-base hover:text-primary active:text-primary"
                  onClick={() => handleSortF1(!sortF1)}
                >
                  {sortF1 ? "▲" : "▼"}
                </button>
              </th>
              <th className="w-1/4 whitespace-nowrap px-3 md:px-4">
                <span className="text-left">{section.request}</span>
                <button
                  className="px-2 text-base hover:text-primary active:text-primary"
                  onClick={() => handleSortF2(!sortF2)}
                >
                  {sortF2 ? "▲" : "▼"}
                </button>
              </th>
              <th className="w-1/4 flex-row items-center whitespace-nowrap pr-2 text-right md:pr-4">
                <span className="mr-1">{section.bandwidth}</span>
                <button
                  className="pl-2 text-base hover:text-primary active:text-primary"
                  onClick={() => handleSortF3(!sortF3)}
                >
                  {sortF3 ? "▲" : "▼"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {fetch_data
              .slice(
                currentPage * countPerPage,
                (currentPage + 1) * countPerPage
              )
              .map((d, index) => (
                <PopularTableRow key={index} row={d} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="my-2 flex whitespace-nowrap">
          Showing {countPerPage * currentPage + 1} to{" "}
          {Math.min((currentPage + 1) * countPerPage, fetch_data.length)} of{" "}
          {fetch_data.length} entries
        </div>
        <div className="flex w-full md:justify-end">
          <Paginations
            pageCount={pageCount}
            currentPage={currentPage}
            navigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};
