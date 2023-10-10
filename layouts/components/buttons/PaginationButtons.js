import clsx from "clsx";

export const PaginationPrevButton = ({ isEnabled = true, callback }) => {
  const style_global = "w-[24px] h-[24px] rounded-sm";
  const style_prev = "bg-[url('/images/statistics/data_ic_arrow_left.svg')]";
  const style_prev_disabled =
    "bg-[url('/images/statistics/data_ic_arrow_left_dis.svg')]";

  return (
    <button
      className={clsx(
        style_global,
        isEnabled == true && style_prev,
        isEnabled == false && style_prev_disabled,
      )}
      onClick={()=>callback()}
    />
  );
};

export const PaginationNextButton = ({ isEnabled = true, callback }) => {
  const style_global = "w-[24px] h-[24px] rounded-sm";
  const style_next = "bg-[url('/images/statistics/data_ic_arrow_right.svg')]";
  const style_next_disabled =
    "bg-[url('/images/statistics/data_ic_arrow_right_dis.svg')]";

  return (
    <button
      className={clsx(
        style_global,
        isEnabled == true && style_next,
        isEnabled == false && style_next_disabled,
      )}
      onClick={()=>callback()}
    />
  );
};