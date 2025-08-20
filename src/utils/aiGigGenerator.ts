import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const generateGigWithThumbnail = async (
  title: string,
  category: string
) => {
  try {
    // 1️⃣ Generate text (description, pricing, etc.) using Google GenAI
    const textPrompt = `
      Generate a gig for the title: "${title}" in category "${category}".
      Include:
      - A short title
      - Description
      - Pricing for three packages: basic, standard, premium
        with: name, description, deliveryTime (days), price, revisions
      Return as JSON only.
    `;

    const textResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: textPrompt,
    });

    // Clean AI response to remove markdown/code block
    const rawText = textResponse.text || "";
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let aiResult;
    try {
      aiResult = JSON.parse(cleanedText);
    } catch (err) {
      console.error("AI returned invalid JSON, using fallback.", err);
      aiResult = {};
    }

    // 2️⃣ Generate thumbnail using DeepAI (free)
    const imagePrompt = `Modern gig thumbnail for: "${title}"`;
    let thumbnailUrl = "";

    try {
      const imageResponse = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "Api-Key": process.env.DEEPAI_API_KEY, // set this in your .env
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ text: imagePrompt }),
      });

      const imageData = await imageResponse.json();
      thumbnailUrl =
        imageData.output_url ||
        "https://via.placeholder.com/512x512?text=Gig+Thumbnail";
    } catch (err) {
      console.error("DeepAI image generation failed, using placeholder.", err);
      thumbnailUrl = "https://via.placeholder.com/512x512?text=Gig+Thumbnail";
    }

    // 3️⃣ Return full gig object for MongoDB
    return {
      title: aiResult.title || title,
      description: aiResult.description || "AI-generated description.",
      category,
      pricing: {
        basicPackage: aiResult.basicPackage || {
          name: "Basic",
          description: "Basic service",
          deliveryTime: 2,
          price: 50,
          revisions: 1,
        },
        standardPackage: aiResult.standardPackage || {
          name: "Standard",
          description: "Standard service",
          deliveryTime: 3,
          price: 100,
          revisions: 2,
        },
        premiumPackage: aiResult.premiumPackage || {
          name: "Premium",
          description: "Premium service",
          deliveryTime: 5,
          price: 200,
          revisions: 3,
        },
      },
      images: [thumbnailUrl],
      userId: "68941ae1823bebabf11625a5", // fixed seller ID
      status: "active",
    };
  } catch (error) {
    console.error("Error generating AI gig:", error);

    // fallback gig
    return {
      title,
      description: "AI generation failed, fallback description.",
      category,
      pricing: {
        basicPackage: {
          name: "Basic",
          description: "",
          deliveryTime: 2,
          price: 50,
          revisions: 1,
        },
        standardPackage: {
          name: "Standard",
          description: "",
          deliveryTime: 3,
          price: 100,
          revisions: 2,
        },
        premiumPackage: {
          name: "Premium",
          description: "",
          deliveryTime: 5,
          price: 200,
          revisions: 3,
        },
      },
      images: ["https://via.placeholder.com/512x512?text=Gig+Thumbnail"],
      userId: "68941ae1823bebabf11625a5",
      status: "active",
    };
  }
};
