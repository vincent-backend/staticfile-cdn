import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import ToggleButton from "@components/buttons/ToggleButton";
import { SiteNames } from "constant/Types";

const ChartArea = ({ section }) => {
  const canvasEl = useRef(null);

  const [gTencent, setGTencent] = useState(true);
  const [gHuawei, setGHuawei] = useState(true);

  const colors = {
    tencent: "#FF941A",
    huawei: "#1CBC9C",
  };

  const handleToggleTencent = () => {
    setGTencent(!gTencent);
  };

  const handleToggleHuawei = () => {
    setGHuawei(!gHuawei);
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const dTencent = [
      50060, 51060, 55059, 51061, 53059, 50060, 52059, 53058, 54059, 52059,
      55059, 51060, 53059, 54058, 55059,
    ];
    const dHuawei = [
      25160, 27160, 31159, 27161, 29159, 31160, 29159, 30158, 28159, 26159,
      29160, 31159, 33161, 29159, 28160,
    ];

    const labels = [
      "2023-07-07",
      "2023-07-08",
      "2023-07-09",
      "2023-07-10",
      "2023-07-11",
      "2023-07-12",
      "2023-07-13",
      "2023-07-14",
      "2023-07-15",
      "2023-07-16",
      "2023-07-17",
      "2023-07-18",
      "2023-07-19",
      "2023-07-20",
      "2023-07-21",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: dTencent,
          fill: false,
          hidden: !gTencent,
          borderWidth: 2,
          borderColor: colors.tencent,
          lineTension: 0.2,
          pointBackgroundColor: "#fff",
          pointBorderColor: colors.tencent,
          pointRadius: 3,
        },
        {
          label: "",
          data: dHuawei,
          fill: false,
          hidden: !gHuawei,
          borderWidth: 2,
          borderColor: colors.huawei,
          lineTension: 0.2,
          pointBackgroundColor: "#fff",
          pointBorderColor: colors.huawei,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="flex-col">
      <div className="flex justify-start space-x-3 mb-2">
        <div className="flex flex-row mr-5 items-center">
          <span className="text-h6 font-bold mr-3">{section.tencent}</span>
          <ToggleButton
            site={SiteNames.Tencent}
            checked={gTencent}
            callback={() => handleToggleTencent}
          />
        </div>
        <div className="flex flex-row mr-3 items-center">
          <span className="text-h6 font-bold mr-3">{section.huawei}</span>
          <ToggleButton
            site={SiteNames.Huawei}
            checked={gHuawei}
            callback={() => handleToggleHuawei}
          />
        </div>
      </div>
      <div className="flex justify-center h-[515px]">
        <canvas id="myChart" ref={canvasEl}></canvas>
      </div>
    </div>
  );
};

export default ChartArea;
