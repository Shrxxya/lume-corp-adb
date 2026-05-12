export const runtime = "nodejs";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: {
        num_inference_steps: 4, // FLUX works best with low steps
        guidance_scale: 3.5,     // optional but helps stability
      },
    });

    return new Response(imageBlob, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
    console.error("FLUX ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Image generation failed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}