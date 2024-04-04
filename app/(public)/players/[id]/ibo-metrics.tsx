"use client";

import { useEffect, useState } from "react";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Pie } from "react-chartjs-2";

export function IBOActiveChart() {
  return (
    <Pie
      data={{
        labels: ["Total", "Sold"],
        datasets: [
          {
            data: [1000, 250],
            backgroundColor: ["#eeeeee", "#0046b3"],
            hoverBackgroundColor: ["#eeeeee", "#004ce6"],
          },
        ],
      }}
    />
  );
}

export function IBOCounter({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const days = Math.floor(remaining / 1000 / 60 / 60 / 24);
  const hours = Math.floor((remaining / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  function Segment({ value, label }: { value: number; label: string }) {
    return (
      <span className="tabular-nums relative rounded shadow-lg p-4 bg-brand-900 text-white font-medium text-3xl grow text-center">
        {value.toFixed(0).padStart(2, "0")}
        <span className="text-sm text-gray-500 absolute text-center inset-x-0 -bottom-6">
          {label}
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center pb-6">
      <Segment value={days} label="Days" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={hours} label="Hours" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={minutes} label="Minutes" />
      <span className="text-brand-900 px-1 font-medium text-3xl">:</span>
      <Segment value={seconds} label="Seconds" />
    </div>
  );
}
