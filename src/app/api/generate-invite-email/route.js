import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export async function POST(req) {
  try {
    const { summaryData } = await req.json();

    const filteredSummaryData = {
      ...summaryData,
    };

    delete filteredSummaryData.theme;
    delete filteredSummaryData.menu;
    delete filteredSummaryData.vendors;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an elite corporate event planner.

Write a polished invitation email for guests.

Event details:
${JSON.stringify(filteredSummaryData, null, 2)}

Rules:
- professional
- elegant
- concise
- warm tone
- no placeholders like [Guest Name]
- no subject line
- plain text only
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    return Response.json({
      email: text,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Failed to generate email",
      },
      { status: 500 }
    );
  }
}