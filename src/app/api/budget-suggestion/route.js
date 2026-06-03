import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { summaryData } = await req.json();
    console.log(summaryData);
    

    // reduce noise for better AI reasoning
    const compactData = {
      eventName: summaryData?.eventName,
      date: summaryData?.date,
      //location: summaryData?.location,
      guestCount: summaryData?.guestCount,
      budget: summaryData?.budget,
      eventType: summaryData?.eventType,
      budgetBreakdown: summaryData?.budgetBreakdown,
    };

    const prompt = `
You are a world-class event budget optimization AI.

You ONLY output structured JSON for automatic UI application.

Event context:
${JSON.stringify(compactData, null, 2)}

Budget categories:
- food
- decor
- tech
- performance
- extras

RULES:
- You must suggest EXACTLY ONE reallocation action
- Always reduce one category and increase another
- Only small adjustments (1% to 8%)
- Keep total budget unchanged overall
- Be context-aware:
  - tech talk / conference → increase tech, reduce performance or decor
  - awards and recognition / gala → increase food and beverages, reduce tech
  - weddings / parties → increase decor or food
  - small guest count → reduce food or performance waste
- DO NOT suggest changes that make any category negative or above 100 individually

OUTPUT FORMAT (STRICT JSON ONLY, NO TEXT):

{
  "reduce": {
    "category": "decor",
    "percent": 3
  },
  "increase": {
    "category": "tech",
    "percent": 3
  },
  "title": "short insight title",
  "impact": "expected benefit"
}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content || "{}";

    // let parsed;

    // try {
    //   parsed = JSON.parse(text);
    // } catch (e) {
    //   parsed = {
    //     title: "Budget Insight",
    //     message: text,
    //     impact: "",
    //   };
    // }

    let cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error("Failed to parse:", cleanText);

      parsed = {
        title: "Budget Insight",
        impact: "",
      };
    }

    return Response.json({
      suggestion: parsed,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err?.message || "Failed to generate suggestion",
      },
      { status: 500 }
    );
  }
}