import express from "express";
import cors from "cors";
import fetch from "node-fetch";

//https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7576694&lng=75.9062043&restaurantId=63800&catalog_qa=undefined&submitAction=ENTER
const app = express();
const PORT = 5000;


// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:1234" // Parcel dev server default port
}));

app.get("/api/menu", async (req, res) => {
  const { restaurantId } = req.query;
 

  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7576694&lng=75.9062043&restaurantId=${restaurantId || "63800"}&catalog_qa=undefined&submitAction=ENTER`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": "https://www.swiggy.com/",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Swiggy API request failed with " + response.status);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.use(cors({
  origin: "http://localhost:1234" // Parcel dev server default port
}));

app.get("/api/restaurants", async (req, res) => {
  
 

  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7576694&lng=75.9062043&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": "https://www.swiggy.com/",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Swiggy API request failed with " + response.status);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});