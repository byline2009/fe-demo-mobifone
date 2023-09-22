export const optionsHorizontalBar = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Top hợp đồng",
    },
  },
};

const labelsHorizontalBar = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const dataHorizontalBar = {
  labels: labelsHorizontalBar,
  datasets: [
    {
      label: "Dataset 1",
      data: [70, 60, 50, 40, 30, 20, 10],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [75, 65, 55, 45, 35, 25, 15],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
