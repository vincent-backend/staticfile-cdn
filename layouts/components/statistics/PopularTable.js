import { useEffect, useState } from "react";
import { RecordCounts } from "constant/Types";

import { staticData } from ".mock/statisticsData";
import PopularTableRow from "./PopularTableRow";

export const PopularTable = ({ section }) => {

  const fetch_data = staticData.popular_projects;

  const [total, setTotal] = useState(101);
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

  useEffect(() => {});

  return (
    <div className="flex-col">
      <div className="flex">
        <div className="flex h-[48px] items-center mr-2 md:mr-10 text-h6">
          <span>Show: </span>
          <select
            className="border-none active:border-none bg-body"
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
              <th className="text-left pl-2 md:pl-4">{section.item_name}</th>
              <th className="text-left pl-2">{section.request}</th>
              <th className="text-right flex-row items-center pr-2 md:pr-4">
                <span className="mr-1">{section.bandwidth}</span>
              </th>
            </tr>
          </thead>
          <tbody className="font-normal">
            {data.map((d) => (
              <PopularTableRow key={d.id} row={d} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex">Showing...</div>
        <div className="flex w-full md:justify-end">Pagination</div>
      </div>
    </div>
  );
};