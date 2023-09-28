import { IoCaretDown } from "react-icons/io5";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <select className="dropbtn">
        <option value="18.2.0" className="h-10">18.2.0</option>
        <option value="18.2.1" className="h-10">18.2.1</option>
      </select>
    </div>
  );
};

export default Dropdown;
