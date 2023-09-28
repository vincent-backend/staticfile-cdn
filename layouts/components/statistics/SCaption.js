const SCaption = ({ caption }) => {
  return (
    <div className="flex flex-row items-end">
      <div className="flex flex-col">
        <div className="caption flex flex-row">{caption}</div>
        <div className="flex flex-row bg-primary h-1 mt-2"></div>
      </div>
      <div className="flex grow bg-slate-200 h-[1px]"></div>
    </div>
  );
};

export default SCaption;
