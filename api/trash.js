const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/generate", async (req, res) => {
  const content = req.body.content;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: content }],
      model: "llama3-8b-8192",
    });
    res.send(chatCompletion.choices?.[0]?.message?.content || "No content returned");
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/image_analysis", async (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).send("Image URL is required");

  const base64Image = fs.readFileSync("Naveen_res.jpg").toString("base64");

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "give detailed resume feedback, score this resume and give feedback on where and what can be improved ?" },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
    });

    res.send(chatCompletion.choices?.[0]?.message?.content || "No content returned");
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).send("Error analyzing the image");
  }
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});

