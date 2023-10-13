const SCaption = ({ caption }) => {
  return (
    <div className="flex flex-row items-end">
      <div className="flex flex-col">
        <div className="caption flex flex-row">{caption}</div>
        <div className="mt-2 flex h-1 flex-row bg-primary"></div>
      </div>
      <div className="flex h-[1px] grow bg-slate-200"></div>
    </div>
  );
};

export default SCaption;
