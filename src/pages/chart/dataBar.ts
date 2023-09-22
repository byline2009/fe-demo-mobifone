const rand = () => Math.round(Math.random() * 500);

const dataBarWith2Axis = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      yAxisID: "right-y-axis",
      type: "line",
      label: "CTR",
      borderColor: "#ba78cb",
      borderWidth: 3,
      fill: true,
      cubicInterpolationMode: "monotone",

      backgroundColor: "rgba(186, 120, 203, 0.05)",
      data: [1, 2, 3, 4, 5, 6, 7],
    },

    {
      yAxisID: "left-y-axis",
      type: "bar",
      label: "Clicks",
      borderWidth: 0,
      borderRadius: 6,
      borderSkipped: false,
      backgroundColor: "#1096a5",
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      barThickness: 10,
      //   borderSkipped: ["bottom"],
    },
  ],
};

const optionsBarWith2Axis = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    "left-y-axis": {
      type: "linear",
      position: "left",
      grid: {
        borderDash: [8, 6],
        lineWidth: 2,
      },
      ticks: {
        maxTicksLimit: 6,
      },
    },
    "right-y-axis": {
      type: "linear",
      position: "right",
      grid: {
        display: false,
      },
      ticks: {
        callback: (v: number) => v + "%",
        maxTicksLimit: 6,
      },
    },
  },
};

export { dataBarWith2Axis, optionsBarWith2Axis };
