import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import ToggleButton from "@layouts/components/statistics/ToggleButton";
import { SiteNames } from "constant/Types";

const ChartArea = ({section}) => {

    const canvasEl = useRef(null);

    const [gTencent, setGTencent] = useState(true);
    const [gHuawei, setGHuawei] = useState(true);

    const colors = {
        tencent: "#FF941A",
        huawei: "#1CBC9C",
    };

    const handleToggleTencent = () => {
        setGTencent(!gTencent);
    }

    const handleToggleHuawei = () => {
        setGHuawei(!gHuawei);
    }

    useEffect(() => {
        const ctx = canvasEl.current.getContext("2d");
        // const ctx = document.getElementById("myChart");
    
        const dTencent = [50060.0, 51060.2, 55059.1, 51061.4, 53059.9, 50060.2, 52059.8, 53058.6, 54059.6, 52059.2, 55059.9, 51060.2, 53059.8, 54058.6, 55059.6];
        const dHuawei = [25160.0, 27160.2, 31159.1, 27161.4, 29159.9, 31160.2, 29159.8, 30158.6, 28159.6, 26159.2, 29160.2, 31159.1, 33161.4, 29159.9, 28160.2];
    
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
              pointRadius: 3
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
                pointRadius: 3
              }
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
                    display: false
                  }
                },
              },
            plugins: {
                legend: {
                    display: false
                }
            }
          }
        };
        const myLineChart = new Chart(ctx, config);
    
        return function cleanup() {
          myLineChart.destroy();
        };
      });


    return(
        <div className="flex-col">
            <div className="flex justify-start space-x-3 mb-2">
                <div className="flex flex-row mr-5 items-center">
                    <span className="text-h6 font-bold mr-3">{section.tencent}</span>
                    <ToggleButton site={SiteNames.Tencent} checked={gTencent} callback={() => handleToggleTencent} />
                </div>
                <div className="flex flex-row mr-3 items-center">
                    <span className="text-h6 font-bold mr-3">{section.huawei}</span>
                    <ToggleButton site={SiteNames.Huawei} checked={gHuawei} callback={() => handleToggleHuawei} />
                </div>                
            </div>
            <div className="flex justify-center h-[515px]">
                <canvas id="myChart" ref={canvasEl}></canvas>
            </div>
            
        </div>
        
    );
}

export default ChartArea;