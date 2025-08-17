const ctx = document.getElementById("graficoSemanal");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    datasets: [{
      data: [
        week.S1,
        week.M,
        week.T,
        week.W,
        week.T2,
        week.F,
        week.S2
      ],
      backgroundColor: [
        "rgba(30, 30, 30, 0.8)",
        "rgba(230, 240, 255, 0.8)",
        "rgba(30, 30, 30, 0.8)",
        "rgba(230, 240, 255, 0.8)",
        "rgba(30, 30, 30, 0.8)",
        "rgba(230, 240, 255, 0.8)",
        "rgba(30, 30, 30, 0.8)",
      ],
      borderRadius: 15,
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#fff"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      },
      y: {
        ticks: {
          color: "#fff"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    }
  }
});