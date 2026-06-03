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

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(summaryData.date));

    const prompt = `
You are an elite corporate event planner.

Write a polished invitation email for guests.

Event details (DO NOT MODIFY):
  Event Date - ${formattedDate}
  Event Time - ${summaryData.time}
  Event Name - ${summaryData.eventName}
  Location - ${summaryData.location}

Rules:
- professional
- elegant
- concise
- warm tone
- no placeholders like [Guest Name]
- no subject line
- plain text only

You MUST follow this exact structure:

Greetings,

<EMAIL_BODY>

Thankyou

- Replace <EMAIL_BODY> with the invitation content only
- Do not add anything outside this structure
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