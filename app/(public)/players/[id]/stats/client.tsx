"use client";

import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
Chart.register(RadialLinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Filler);
import { Radar } from "react-chartjs-2";

export function OverviewChart() {
  const data = [65, 59, 80, 12, 56];

  return (
    <Radar
      options={{
        backgroundColor: "#ff0000",
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: 100,

            pointLabels: {
              callback(label, index) {
                return label + " " + data[index];
              },
              font: {
                size: 12,
              },
            },
          },
        },
      }}
      data={{
        labels: ["Strength", "Speed", "Stamina", "Defense", "Offense"],
        datasets: [
          {
            label: "Player Stats",
            data,
            fill: true,
            backgroundColor: "#1859B620",
            borderColor: "#1859B6",
            borderWidth: 1,
            pointBackgroundColor: "white",
            pointBorderColor: "#1859B6",
            pointRadius: 4,
          },
        ],
      }}
    />
  );
}
