import express from "express";
import cors from "cors";

import menuRoute from "./api/menu.js";
import restaurantRoute from "./api/restaurant.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoute);
app.use("/api/restaurant", restaurantRoute);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
