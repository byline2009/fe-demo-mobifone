const dataBarWith2AxisEmployee = (
  labels: string[],
  numberTopCOntract: number[],
  doanhthuTopContract: number[]
) => {
  return {
    labels: labels,
    datasets: [
      {
        yAxisID: "right-y-axis",
        type: "bar",
        label: "Số hợp đồng",
        borderColor: "#35a2eb",
        borderWidth: 2,
        fill: true,
        cubicInterpolationMode: "monotone",
        barThickness: 10,
        backgroundColor: "rgba(215, 236, 251, 0.5)",
        data: numberTopCOntract,
      },

      {
        yAxisID: "left-y-axis",
        type: "bar",
        label: "Doanh thu",

        borderWidth: 3,
        fill: true,
        cubicInterpolationMode: "monotone",
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.5)",
        data: doanhthuTopContract,
        barThickness: 50,
      },
    ],
  };
};

const optionsBarWith2AxisEmployee = {
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
        borderDash: [8, 6],
        lineWidth: 2,
      },
      ticks: {
        callback: (v: number) => v,
        maxTicksLimit: 6,
      },
    },
  },
};

export { dataBarWith2AxisEmployee, optionsBarWith2AxisEmployee };
