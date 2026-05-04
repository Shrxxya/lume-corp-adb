// /app/api/send-email/route.js

import nodemailer from "nodemailer";

export async function POST(req) {
  const { pdfUrl, summaryData, quotation } = await req.json();

  const pdfRes = await fetch(pdfUrl);
  const buffer = Buffer.from(await pdfRes.arrayBuffer());

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Event Request - ${summaryData.eventName}`,
    html: `
      <h2>New Event Planning Request</h2>
      <p><b>Event:</b> ${summaryData.eventName}</p>
      <p><b>Budget:</b> ₹${summaryData.budget}L</p>
      <p><b>Guests:</b> ${summaryData.guestCount}</p>
      <p><b>Estimated Fee:</b> ₹${quotation.total}L</p>
    `,
    attachments: [
      {
        filename: "event-proposal.pdf",
        content: buffer,
      },
    ],
  });

  return Response.json({ success: true });
}