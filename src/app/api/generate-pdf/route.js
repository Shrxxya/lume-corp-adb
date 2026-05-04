// /app/api/generate-pdf/route.js

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import EventPDF from "@/components/pdf/EventPDF";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { data, quotation } = await req.json();

  const pdfBuffer = await renderToBuffer(
    <EventPDF data={data} quotation={quotation} />
  );

  const fileName = `event-${uuidv4()}.pdf`;
  const filePath = path.join(process.cwd(), "public", fileName);

  fs.writeFileSync(filePath, pdfBuffer);

  const url = `/${fileName}`;

  return NextResponse.json({ url });
}