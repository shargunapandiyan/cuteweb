import React, { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";

const AttendanceGauge = () => {
  const chartComponentRef = useRef(null);
  const [value, setValue] = useState(50); // Initial value (in meters)

  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "80%",
    },

    title: {
      text: "Today Attendance",
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },

    yAxis: {
      min: 0,
      max: 100, // ✅ Changed from 200 to 100
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart?.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 60,
          color: "#55BF3B", // green
          thickness: 20,
          borderRadius: "50%",
        },
        {
          from: 60,
          to: 80,
          color: "#DDDF0D", // yellow
          thickness: 20,
        },
        {
          from: 80,
          to: 100,
          color: "#DF5353", // red
          thickness: 20,
          borderRadius: "50%",
        },
      ],
    },

    series: [
      {
        name: "Distance",
        data: [value],
        tooltip: {
          valueSuffix: " meter", // ✅ Changed unit
        },
        dataLabels: {
          format: "{y} %", // ✅ Changed label
          borderWidth: 0,
          color: Highcharts.defaultOptions.title?.style?.color || "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.round((Math.random() - 0.5) * 10);
      setValue((prev) => {
        let newVal = prev + inc;
        if (newVal < 0 || newVal > 100) {
          newVal = prev - inc;
        }

        const chart = chartComponentRef.current?.chart;
        if (chart) {
          chart.series[0].points[0].update(newVal);
        }

        return newVal;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default AttendanceGauge;
