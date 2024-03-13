import { useEffect, useRef } from "react";

function Tabs({ children, onChangeTab }) {
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
    activeTabLink.classList.remove("active-tab", "z-20", "text-white");
    activeTabLink.classList.add("tab", "text-dark", "z-10");
    event.currentTarget.classList.remove("tab", "text-dark");
    event.currentTarget.classList.add("active-tab", "z-20", "text-white");
    activeItem.classList.add("hidden");
    items[index].classList.remove("hidden");
    onChangeTab(event.currentTarget.outerText);
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
              index !== 0 && "-ml-3"
            } shrink-0 w-[120px] h-[36px] cursor-pointer flex items-center justify-center font-semibold text-[16px] pr-[6px] tracking-wide ${
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
