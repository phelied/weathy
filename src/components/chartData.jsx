import React from "react";
import clouds from "../assets/images/clouds.png";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartData = ({ weatherInfo }) => {
  const data = {
    labels: [20, 34, 28, 22],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#EF9056",
        borderColor: "#EF9056",
        data: [20, 34, 28, 22],
      },
    ],
  };
  return (
    <>
      <div className="text-[#1A2840] font-bold text-3xl mt-8">
        <span>How's the</span>
        <br />
        <span>temperature today ? </span>
      </div>
      <div className="w-full mt-12">
        <div className="grid grid-cols-4 w-full mt-4 text-black absolute justify-center">
          <img
            src={clouds}
            style={{ bottom: "2em" }}
            className="h-12 p-2 border-[#F4F5F7] border rounded-full relative"
            alt="Rectangle-1"
            border="0"
          />
          <img
            src={clouds}
            style={{ bottom: "4em" }}
            className="h-12 p-2 border rounded-full relative"
            alt="Rectangle-1"
            border="0"
          />
          <img
            src={clouds}
            style={{ bottom: "2em" }}
            alt="Rectangle-1 "
            className="h-12 p-2 border relative rounded-full"
            border="0"
          />
          <img
            src={clouds}
            style={{ bottom: "2em" }}
            alt="Rectangle-1"
            border="0"
            className="h-12 p-2 border relative rounded-full"
          />
        </div>
        <div className="h-16">
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 30,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  hoverRadius: 3,
                },
              },
              scales: {
                y: {
                  display: false,
                  grid: {
                    display: false,
                  },
                },
                x: {
                  display: false,
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-5 mt-4 text-black">
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold  text-lg">20°</span>
            <span className="text-[#828282] font-semibold mt-0.5">Morning</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold  text-lg">34°</span>
            <span className="text-[#828282] font-semibold mt-0.5">
              Afternoon
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold  text-lg">28°</span>
            <span className="text-[#828282] font-semibold mt-0.5">Evening</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-bold  text-lg">22°</span>
            <span className="text-[#828282] font-semibold mt-0.5">Night</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartData;
