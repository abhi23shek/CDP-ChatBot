const express = require("express");
const axios = require("axios");
require("dotenv").config();

// const app = express();
const PORT = 3001;

const cors = require("cors");
const app = express();
app.use(cors()); // Allow all origins

// Fetch search results from Google Custom Search API
async function searchDocuments(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${process.env.SEARCH_ENGINE_ID}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.items.slice(0, 1).map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    return [];
  }
}

// Summarize results using OpenAI
async function summarizeWithGPT(searchResults, query) {
  const client = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });

  try {
    const response = await client.post("/chat/completions", {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that summarizes search results.",
        },
        {
          role: "user",
          content: `Summarize these search results for: ${query}\n\n${JSON.stringify(
            searchResults
          )}`,
        },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching GPT summary:", error.message);
    return "Could not generate a summary.";
  }
}

app.get("/", (req, res) => {
  res.send("CDP ChatBot API");
});

// API endpoint to fetch search results and generate a summary
app.get("/query", async (req, res) => {
  const query = req.query.q;
  if (!query)
    return res.status(400).json({ error: "Query parameter is required" });

  const results = await searchDocuments(query);
  if (results.length === 0)
    return res.json({ summary: "No relevant results found.", sources: [] });

  const summary = await summarizeWithGPT(results, query);
  res.json({ summary, sources: results });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
