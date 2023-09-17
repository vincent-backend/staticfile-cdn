import { useEffect, useState } from "react";

// how to use
// const mobile = useWindow(767) < 768
// returns true/false

const useWindow = () => {
  // getWindowDimensions
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    function viewport() {
      var width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      var height = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );

      setWindowSize({width, height});
    }
    viewport();
    window.onresize = viewport;
  }, []);

  return windowSize;
};

export default useWindow;
