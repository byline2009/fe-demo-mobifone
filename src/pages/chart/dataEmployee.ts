const dataBarWith2AxisEmployee = (
  labels: string[],
  numberTopCOntract: number[],
  doanhthuTopContract: number[],
  barTopContractWidth: number,
  barDoanhthuWidth: number
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
        barThickness: barTopContractWidth,
        backgroundColor: "rgba(215, 236, 251, 0.5)",
        data: numberTopCOntract,
      },

      {
        yAxisID: "left-y-axis",
        type: "bar",
        label: "Doanh thu",
        borderWidth: 2,
        fill: true,
        cubicInterpolationMode: "monotone",
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.5)",
        data: doanhthuTopContract,
        barThickness: barDoanhthuWidth,
      },
    ],
  };
};

const optionsBarWith2AxisEmployee = (props: any) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: props.fontSize,
          },
        },
        grid: {
          display: false,
        },
      },

      "left-y-axis": {
        type: "linear",
        position: "left",
        grid: {
          borderDash: props.borderDash,
          lineWidth: props.lineWidth,
        },
        ticks: {
          maxTicksLimit: 6,
          font: {
            size: props.fontSize,
          },
        },
      },
      "right-y-axis": {
        type: "linear",
        position: "right",
        grid: {
          borderDash: props.borderDash,
          lineWidth: props.lineWidth,
        },
        ticks: {
          callback: (v: number) => v,
          maxTicksLimit: 6,
          font: {
            size: props.fontSize,
          },
        },
      },
    },
  };
};

export { dataBarWith2AxisEmployee, optionsBarWith2AxisEmployee };
