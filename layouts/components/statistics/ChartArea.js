import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartArea = () => {

    const canvasEl = useRef(null);

    return(
        <canvas id="myChart" ref={canvasEl}></canvas>
    );
}

export default ChartArea;