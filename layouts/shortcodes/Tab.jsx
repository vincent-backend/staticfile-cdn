function Tab({ children, click }) {
  return <li className="tab-item my-0 hidden" onClick={click}>{children}</li>;
}

export default Tab;
