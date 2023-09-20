import { useEffect, useRef } from "react";

function Tabs({ children }) {
  //select tabItems
  const tabItemsRef = useRef(null);

  //change tab item on click
  const handleChangTab = (event, index) => {
    const tabLinks = [...event.currentTarget.parentElement.children];
    const items = [...tabItemsRef.current.children];
    const activeItem = items.find((item) => !item.classList.contains("hidden"));
    const activeTabLink = tabLinks.find((item) =>
      item.classList.contains("active-tab"),
    );
    if (activeItem === items[index]) return;
    activeTabLink.classList.remove("active-tab", "z-10", "text-white");
    activeTabLink.classList.add("tab", "text-dark");
    event.currentTarget.classList.remove("tab", "text-dark");
    event.currentTarget.classList.add("active-tab", "z-10", "text-white");
    activeItem.classList.add("hidden");
    items[index].classList.remove("hidden");
  };

  //show first tab-item
  useEffect(() => {
    let allItems = [...tabItemsRef.current.children];
    allItems[0].classList.remove("hidden");
  }, []);

  return (
    <div className="relative">
      <ul className="mb-0 flex list-none items-center pl-0">
        {children.map((item, index) => (
          <li
            key={index}
            className={`${
              index !== 0 && "-ml-5"
            } shrink-0 w-[163px] h-[50] cursor-pointer px-8 py-3 font-semibold text-base indent-4 tracking-wide ${
              index === 0 && "text-white"
            } ${index > 0 && "text-dark"} ${index === 0 && "active-tab z-10"} ${
              index > 0 && "tab"
            }`}
            onClick={(e) => handleChangTab(e, index)}
          >
            {item.props.name}
          </li>
        ))}
      </ul>
      <ul
        className="mb-0 list-none rounded-b-md bg-white px-2 py-5"
        ref={tabItemsRef}
      >
        {children}
      </ul>
    </div>
  );
}

export default Tabs;
