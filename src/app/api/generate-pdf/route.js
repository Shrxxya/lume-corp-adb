// /app/api/generate-pdf/route.js

import { NextResponse } from "next/server";
import { renderToBuffer, pdf } from "@react-pdf/renderer";
import EventPDF from "@/components/pdf/EventPDF";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// export async function POST(req) {
//   const { data, quotation, decorImage, canvasImage } = await req.json();

//   const pdfBuffer = await renderToBuffer(
//     <EventPDF data={data} quotation={quotation} decorImage={decorImage}  canvasImage={canvasImage}  />
//   );

//   const fileName = `event-${uuidv4()}.pdf`;
//   const filePath = path.join(process.cwd(), "public", fileName);

//   fs.writeFileSync(filePath, pdfBuffer);

//   const url = `/${fileName}`;

//   return NextResponse.json({ url });
// }
export async function POST(req) {
  try {
    const { data, quotation, decorImage, canvasImage } =
      await req.json();

    // generate pdf instance
    const doc = (
      <EventPDF
        data={data}
        quotation={quotation}
        decorImage={decorImage}
        canvasImage={canvasImage}
      />
    );

    // blob
    const blob = await pdf(doc).toBlob();

    // buffer
    const arrayBuffer = await blob.arrayBuffer();

    // base64
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const file = `data:application/pdf;base64,${base64}`;

    // upload to cloudinary
    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file }),
      }
    );

    const uploaded = await uploadRes.json();

    return Response.json({
      url: uploaded.url,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}