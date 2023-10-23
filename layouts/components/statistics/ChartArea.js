import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import clsx from "clsx";
import theme from "@config/theme.json";

const ChartArea = ({ section, hits_data }) => {
  const canvasEl = useRef(null);
  const [colors, setColors] = useState(theme.colors.default.network_color);

  const providers = hits_data.providers.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );
  const [count, setCount] = useState(providers.length);

  const [isChartsHidden, setHiddenCharts] = useState(
    Array.from({ length: count }).fill(false)
  );

  // chart data
  const dates = Object.keys(providers[0].dates);

  const datasets = providers.map((provider, index) => {
    const totals = dates.map((date) => provider.dates[date].total);
    return {
      label: provider.name,
      data: totals,
      borderColor: colors[index],
      hidden: isChartsHidden[index],
      borderWidth: 2,
      lineTension: 0.2,
      pointBackgroundColor: "#fff",
      pointBorderColor: colors[index],
      pointRadius: 3,
      fill: false,
    };
  });

  const handleToggle = (index) => {
    const tmpArr = [...isChartsHidden];
    const tmpval = tmpArr[index];
    tmpArr[index] = !tmpval;
    setHiddenCharts(tmpArr);
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "",
          },
          grid: {
            display: false, // Disable grid lines for the y-axis
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "",
          },
        },
      },
      plugins: {
        tooltip: {
          displayColors: false,
          callbacks: {
            label: function (context) {
              let label = "";
              const date = context.chart.data.labels[context.dataIndex];
              const units = ["", "E+03", "E+06", "E+09", "E+12"];
              var myLabel = [];
              context.chart.data.datasets.forEach(function (dataset, index) {
                if (!isChartsHidden[index]) {
                  const value = dataset.data[context.dataIndex];
                  let formattedValue = value;
                  let unitIndex = 0;
                  while (formattedValue >= 1000 && unitIndex < units.length - 1) {
                    formattedValue /= 1000;
                    unitIndex++;
                  }
                  formattedValue = formattedValue.toFixed(2);
                  myLabel.push(
                    dataset.label +
                      " : " +
                      formattedValue +
                      " " +
                      units[unitIndex] +
                      ""
                  );
                }
              });

              return myLabel;
            },
          },
        },
        legend: {
          display: false,
        },
      },
    };

    const config = {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets,
      },
      options: options,
    };

    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="flex-col">
      <div className="mb-2 flex justify-start space-x-5">
        {providers.map((provider, index) => (
          <div className="flex flex-row items-center" key={provider.name}>
            <span className="mr-3 text-h6 font-bold">{provider.name}</span>
            <button
              onClick={() => handleToggle(index)}
              className={clsx(
                "m-auto flex h-[22px] w-[42px] rounded-full p-0 shadow-2xl transition duration-200",
                !isChartsHidden[index] && `justify-end`,
                isChartsHidden[index] && "justify-start"
              )}
              style={{
                background: isChartsHidden[index] ? "#e8eaf1" : colors[index],
              }}
            >
              <span
                className={`m-[3px] h-[16px] w-[16px] rounded-full bg-white p-0 shadow-xl`}
              ></span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex h-[515px] justify-center">
        <canvas id="myChart" ref={canvasEl}></canvas>
      </div>
    </div>
  );
};

export default ChartArea;
