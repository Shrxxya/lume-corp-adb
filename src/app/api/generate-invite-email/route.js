// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_API_KEY
// );

// export async function POST(req) {
//   try {
//     const { summaryData } = await req.json();

//     const filteredSummaryData = {
//       ...summaryData,
//     };

//     delete filteredSummaryData.theme;
//     delete filteredSummaryData.menu;
//     delete filteredSummaryData.vendors;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

//     const prompt = `
// You are an elite corporate event planner.

// Write a polished invitation email for guests.

// Event details:
// ${JSON.stringify(filteredSummaryData, null, 2)}

// Rules:
// - professional
// - elegant
// - concise
// - warm tone
// - no placeholders like [Guest Name]
// - no subject line
// - plain text only
// `;

//     const result = await model.generateContent(prompt);

//     const response = await result.response;

//     const text = response.text();

//     return Response.json({
//       email: text,
//     });
//   } catch (err) {
//     console.error(err);

//     return Response.json(
//       {
//         error: "Failed to generate email",
//       },
//       { status: 500 }
//     );
//   }
// }

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { summaryData } = await req.json();

    // keep payload compact
    const compactEventData = {
      eventName: summaryData.eventName,
      date: summaryData.date,
      location: summaryData.location,
    };

    const prompt = `
You are an elite corporate event planner.

Write a polished invitation email for guests.

Event details:
${JSON.stringify(compactEventData, null, 2)}

Rules:
- professional
- elegant
- concise
- warm tone
- no placeholders like [Guest Name]
- no subject line
- plain text only
`;

    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.8,
      });

    const text =
      completion.choices[0]?.message?.content || "";

    return Response.json({
      email: text,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error:
          err?.message || "Failed to generate email",
      },
      { status: 500 }
    );
  }
}