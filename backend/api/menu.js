import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7576694&lng=75.9062043&restaurantId=63800"
      )
    );

    const text = await response.text();

    // ❗️ SAFETY CHECK
    if (!text.startsWith("{")) {
      return res.status(500).json({
        error: "Swiggy blocked request",
        raw: text.slice(0, 100),
      });
    }

    res.status(200).json(JSON.parse(text));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
