export const runtime = "nodejs";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const imageBlob = await client.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        num_inference_steps: 20,
      },
    });

    return new Response(imageBlob, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
  console.error("HF ERROR:", err);
  return new Response(JSON.stringify({ error: err.message }), {
    status: 500,
  });
  }
}