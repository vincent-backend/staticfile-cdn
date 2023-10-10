import { useEffect, useState } from "react";
import Image from "next/image";
import { RecordCounts } from "constant";
import { staticData } from ".mock/statisticsData";
import PopularTableRow from "./PopularTableRow";
import Paginations from "../Paginations";
import clsx from "clsx";

export const PopularTable = ({ section }) => {

  const [fetch_data, setData] = useState(staticData.popular_projects.sort((a, b) => a.name - b.name));
  const [currentPage, setCurrentPage] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(Math.ceil(fetch_data.length / countPerPage));
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
      setData(fetch_data.sort((a, b) => {return a.name.localeCompare(b.name);}));
    }
    else {
      setData(fetch_data.sort((a, b) => {return b.name.localeCompare(a.name);}));
    }
  }

  const handleSortF2 = (newSort) => {
    setSortF2(newSort);
    if (newSort) {
      setData(fetch_data.sort((a, b) => a.requests - b.requests));
    }
    else {
      setData(fetch_data.sort((a, b) => b.requests - a.requests));
    }
  }

  const handleSortF3 = (newSort) => {
    setSortF3(newSort);
    if (newSort) {
      setData(fetch_data.sort((a, b) => a.bandwidth - b.bandwidth));
    }
    else {
      setData(fetch_data.sort((a, b) => b.bandwidth - a.bandwidth));
    }
  }

  const handleNavigate = (page) => {
    setCurrentPage(page);
  }


  useEffect(() => {
    
  },[]);

  return (
    <div className="flex-col">
      <div className="flex">
        <div className="flex h-[48px] items-center mr-2 md:mr-10 text-h6">
          <span>Show: </span>
          <select
            className="border-none active:border-none bg-body rounded-sm mx-1"
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
          <thead className="bg-body h-[48px] text-h5 font-bold">
            <tr>
              <th className="h-[48px] pl-2 md:pl-4 whitespace-nowrap">
                <span className="text-left">{section.item_name}</span>
                <button className="text-base px-2 hover:text-primary active:text-primary"
                  onClick={()=>handleSortF1(!sortF1)} >
                  {sortF1 ? "▲" : "▼"}
                </button>
              </th>
              <th className="px-3 md:px-4 whitespace-nowrap">
                <span className="text-left">{section.request}</span>
                <button className="text-base px-2 hover:text-primary active:text-primary"
                  onClick={()=>handleSortF2(!sortF2)} >
                  {sortF2 ? "▲" : "▼"}
                </button>
              </th>
              <th className="text-right flex-row items-center pr-2 md:pr-4 whitespace-nowrap">
                <span className="mr-1">{section.bandwidth}</span>
                <button className="text-base pl-2 hover:text-primary active:text-primary" onClick={()=>handleSortF3(!sortF3)}>
                  {sortF3 ? "▲" : "▼"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {fetch_data
            .slice(currentPage * countPerPage, (currentPage + 1) * countPerPage)
            .map((d, index) => (
              <PopularTableRow key={index} row={d} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex whitespace-nowrap my-2">
          Showing {countPerPage * currentPage + 1} to {Math.min((currentPage + 1) * countPerPage, fetch_data.length)} of {fetch_data.length} entries</div>
        <div className="flex w-full md:justify-end">
          <Paginations pageCount={pageCount} currentPage={currentPage} navigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};
