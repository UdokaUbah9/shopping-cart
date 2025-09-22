import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

// Load env vars
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.get("/api/location", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status.code !== 200 || data.results.length === 0) {
      return res.status(500).json({ error: "Failed to fetch location data" });
    }
    res.json({ data: { location: data } });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching location data." });
  }
});

// ---------- STATIC FRONTEND ----------
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// Fallback for React Router (always serve index.html if not an API route)
// fallback for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
