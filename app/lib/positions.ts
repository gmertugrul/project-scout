export const positions = [
  {
    name: "Goalkeepers",
    positions: [
      {
        name: "Goalkeeper",
        value: "GK",
      },
    ],
  },
  {
    name: "Defenders",
    positions: [
      {
        name: "Centre Back",
        value: "CB",
      },
      {
        name: "Sweeper",
        value: "SW",
      },
      {
        name: "Full Back",
        value: "FB",
      },
      {
        name: "Wing Back",
        value: "WB",
      },
      {
        name: "Inverted Wing Back",
        value: "IWB",
      },
    ],
  },
  {
    name: "Midfielders",
    positions: [
      {
        name: "Defensive Midfielder",
        value: "DM",
      },
      {
        name: "Central Midfielder",
        value: "CM",
      },
      {
        name: "Attacking Midfielder",
        value: "AM",
      },
      {
        name: "Wide Midfielder",
        value: "WM",
      },
      {
        name: "Wing",
        value: "W",
      },
    ],
  },
  {
    name: "Forwards",
    positions: [
      {
        name: "Centre Forward",
        value: "CF",
      },
      {
        name: "Striker",
        value: "ST",
      },
      {
        name: "Inside Forward",
        value: "IF",
      },
      {
        name: "False 9",
        value: "F9",
      },
    ],
  },
] as const;

export const positionCodes = [
  "GK",
  "CB",
  "SW",
  "FB",
  "WB",
  "IWB",
  "DM",
  "CM",
  "AM",
  "WM",
  "W",
  "IF",
  "CF",
  "ST",
  "W",
  "IF",
  "F9",
] as const;
