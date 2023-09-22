const dataDonut = (th, kh, color, labelth, labelkh) => {
  return {
    labels: [`${labelth} ${th}`, `${labelkh} ${kh}`],
    datasets: [
      {
        label: "",
        data: [th / kh, 1 - th / kh < 0 ? 0 : 1 - th / kh],
        backgroundColor: [`${color}`, "rgba(54, 162, 235, 0.2)"],
        borderColor: [`${color}`, "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
};
const pluginDonut = (textInput) => {
  return [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = textInput,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
};

export { dataDonut, pluginDonut };
