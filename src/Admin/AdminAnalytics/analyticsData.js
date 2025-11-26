import userProfile1 from "../../assets/AdminImg/user-Profile.png"
import userProfile2 from "../../assets/AdminImg/user-Profile2.png"

export const metricData = [
  {
    title: "Total Tickets",
    value: "3,400",
    subtext: "/ This Week",
    trend: "-2.87%",
    info: {
      Automated: "1,020",
      Escalated: "1,020",
      Closed: "0430",
      "In Progress": "1,020",
    },
  },
];

export const doughnut1 = {
  labels: ["Bot-Human"],
  datasets: [
    {
      data: [70, 30],
      borderWidth: 0,
      backgroundColor: ["#4956E6", "#242424"],
    },
  ],
};

export const doughnut2 = {
  labels: ["Escalated Queries"],
  datasets: [
    {
      data: [30, 70],
      borderWidth: 0,
      backgroundColor: ["#4956E6", "#242424"],
    },
  ],
};

export const lineData = [
  { week: "Week1", Bot: 3, Humans: 4 },
  { week: "Week2", Bot: 4, Humans: 5 },
  { week: "Week3", Bot: 3, Humans: 4 },
  { week: "Week4", Bot: 2, Humans: 4 },
  { week: "Week5", Bot: 3, Humans: 4 },
  { week: "Week6", Bot: 2, Humans: 3 },
];

export const barData = [{ label: "2Hrs 4Mins", Bot: 2.07, Humans: 2.07 }];

export const agents = [
  { avatar: userProfile2, name: "Kristin Watson", department: "Sales", totalTickets: 18 },
  { avatar: userProfile1, name: "Ralph Edwards", department: "Sales", totalTickets: 16 },
  { avatar: userProfile1, name: "Cameron Williamson", department: "Sales", totalTickets: 15 },
];
