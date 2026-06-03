import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const EVENT_RULES = {
  "Awards & Recognition": [
    "Red carpet must be unobstructed and lead directly to stage",
    "Photo wall must be near entrance or red carpet path",
    "VIP tables must be near stage but not blocking camera zone",
    "Award desk must be stage-adjacent",
    "Camera zone must face stage and red carpet",
    "Audience seating must not block red carpet flow"
  ],

  "Tech Launch": [
    "Demo pods must be visible from entrance path",
    "Registration desk must be first touchpoint near entrance",
    "Press/media zone must face stage and demo area",
    "Charging stations must not block circulation",
    "Networking lounge must be separated from demo congestion"
  ],

  Workshop: [
    "Instructor stage must face all tables",
    "Tables must have equal spacing for movement",
    "Whiteboard must be visible to all participants",
    "Refreshments must be placed at edge, not center circulation"
  ],

  Conference: [
    "Main stage must have clear audience sightlines",
    "Sponsor booths must not block audience access",
    "Podium must be visible from all seating blocks",
    "Media row must be behind audience or side aligned"
  ],

  Gala: [
    "Dance floor must be central and unobstructed",
    "Bar must not block dance floor access",
    "Lounge seating must be perimeter based",
    "Stage must not face blocked seating"
  ],

  Convention: [
    "Exhibit booths must have walking lanes between rows",
    "Food court must be away from booth congestion",
    "Networking zone must not block main circulation paths",
    "Info desk must be near entrance"
  ],
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { eventType, venueSize, canvasItems } = body;

    const normalizedType = Object.keys(EVENT_RULES).find(
    (key) => key.toLowerCase() === eventType?.toLowerCase().trim()
    );

    const rules = EVENT_RULES[normalizedType] || [];


    const prompt = `
    You are an expert corporate event venue planner.

    You MUST follow the event-specific rules below. Do NOT use generic advice.

    EVENT TYPE:
    ${eventType}

    EVENT RULES (STRICT):
    ${rules.map((r) => `- ${r}`).join("\n")}

    VENUE SIZE:
    ${JSON.stringify(venueSize, null, 2)}

    ANALYSIS RULES:
    - Only flag issues relevant to THIS event type
    - Do NOT suggest irrelevant setups (no generic registration/entrance advice unless listed above)
    - Be spatially aware (blocking, adjacency, flow)
    - If rule not violated, do not mention it
    - Avoid congestion
    - Do not mention entrance unless present in ${canvasItems}

    OUTPUT STYLE RULES:
    - Write feedback like a human event planner, not an engineer
    - Do NOT mention coordinates, pixel values, distances, measurements, or calculations
    - Do NOT reference x/y positions
    - Do NOT mention exact spacing numbers
    - Describe issues naturally and visually
    - Keep feedback concise and practical
    - Focus on guest experience, movement, visibility, and flow

    BAD EXAMPLES:
    - "distance between table-1 and table-2 is 160"
    - "coffee corner is located at x=68"
    - "stage is 240px away"

    GOOD EXAMPLES:
    - "Tables feel unevenly spaced, which may disrupt movement."
    - "The coffee station slightly interrupts the main circulation path."
    - "Some attendees may have limited visibility of the instructor stage."

    Return STRICT JSON ONLY:

    {
    "score": number,
    "issues": [
        {
        "type": "critical | warning | suggestion",
        "message": string
        }
    ]
    }

    LAYOUT:
    ${JSON.stringify(canvasItems, null, 2)}
    `;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "{}";

    const safeJson = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return Response.json(JSON.parse(safeJson));
  } catch (err) {
    console.error(err);

    return Response.json({
      score: 0,
      issues: [
        {
          type: "warning",
          message: "AI layout review is currently unavailable. You may proceed with the current layout or try again later.",
        },
      ],
    });
  }
}