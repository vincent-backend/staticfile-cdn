import clsx from "clsx";

const Paginations = ({pageCount, currentPage, navigate}) => {

    const getPageNumbers = () => {
        if (pageCount < 4) {
            return [...Array(pageCount + 1).keys()].slice(1);
        } else if (currentPage <= 4) {
            return [1, 2, 3, 4, 5];
        } else if (currentPage > pageCount - 4) {
            return [...Array(5).keys()].reverse().map(v=>pageCount-v);
        } else {
            return [currentPage - 1, currentPage, currentPage + 1];
        }
    }

    return (
        <div className="flex flex-row justify-between space-x-[10px]">
            <button disabled={currentPage == 0} className={clsx("w-[24px] h-[24px] rounded-sm", 
            currentPage > 0 && "bg-[url('/images/statistics/data_ic_arrow_left.svg')]",
            currentPage == 0 && "bg-[url('/images/statistics/data_ic_arrow_left_dis.svg')]")}
            onClick={()=>navigate(currentPage-1)}
            />



          <button disabled={currentPage == pageCount-1} className={clsx("w-[24px] h-[24px] rounded-sm",
            currentPage < pageCount - 1 && "bg-[url('/images/statistics/data_ic_arrow_right.svg')]",
            currentPage == pageCount - 1 && "bg-[url('/images/statistics/data_ic_arrow_right_dis.svg')]")}
            onClick={()=>navigate(currentPage+1)}
            />
        </div>
    );

}

export default Paginations;