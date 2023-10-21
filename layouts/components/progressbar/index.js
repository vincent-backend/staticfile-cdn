const ProgressBar = ({ progress, color }) => {
    return (
      <div className="flex w-full h-[6px] bg-body rounded-[3px]">
        <div className={`h-full rounded-[3px] transition-width duration-500 ease-in-out`} style={{ width: `${progress}%`, background: color } }></div>
      </div>
    );
  };
  
  export default ProgressBar;