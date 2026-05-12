import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await cloudinary.uploader.upload(body.file, {
        resource_type: "raw",
        folder: "event-pdfs",
        public_id: `proposal-${Date.now()}`,
        format: "pdf",
        });

        const pdfUrl = cloudinary.url(result.public_id, {
        resource_type: "raw",
        type: "upload",
        flags: "attachment",
        secure: true,
        });

    return NextResponse.json({
    success: true,
    url: pdfUrl,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}