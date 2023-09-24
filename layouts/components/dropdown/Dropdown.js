import { IoChevronDownSharp } from "react-icons/io5";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn flex items-center justify-between">
        <span className="text-left">18.2.0</span>
        <span className="text-right">
            <IoChevronDownSharp />
        </span>
      </button>
      <ul className="dropdown-content">
        <li>18.2.0</li>
        <li>18.2.0</li>
      </ul>
    </div>
  );
};

export default Dropdown;
