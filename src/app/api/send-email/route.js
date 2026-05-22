// // /app/api/send-email/route.js

// import nodemailer from "nodemailer";

// export async function POST(req) {
//   const { pdfUrl, summaryData, quotation } = await req.json();

//   const pdfRes = await fetch(pdfUrl);
//   const buffer = Buffer.from(await pdfRes.arrayBuffer());

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, // app password
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: `New Event Request - ${summaryData.eventName}`,
//     html: `
//       <h2>New Event Planning Request</h2>
//       <p><b>Event:</b> ${summaryData.eventName}</p>
//       <p><b>Budget:</b> ₹${summaryData.budget}L</p>
//       <p><b>Guests:</b> ${summaryData.guestCount}</p>
//       <p><b>Estimated Fee:</b> ₹${quotation.total}L</p>
//     `,
//     attachments: [
//       {
//         filename: "event-proposal.pdf",
//         content: buffer,
//       },
//     ],
//   });

//   return Response.json({ success: true });
// }

// /app/api/send-email/route.js

import nodemailer from "nodemailer";

export async function POST(req) {
  const startTime = Date.now();

  console.log("\n================ EMAIL API START ================\n");

  try {
    console.log("[EMAIL] Request received");

    const body = await req.json();
    const {
      pdfUrl,
      summaryData,
      quotation,
      leadData,
    } = body;

    console.log("[EMAIL] Payload parsed:", {
      pdfUrl,
      email_to: `${process.env.RECP_EMAIL}, ${leadData?.email}`,
      eventName: summaryData?.eventName,
      budget: summaryData?.budget,
      guestCount: summaryData?.guestCount,
    });

    // ─────────────────────────────────────────────
    // Validate input
    // ─────────────────────────────────────────────
    if (!pdfUrl || !pdfUrl.startsWith("http")) {
      console.warn("[EMAIL] Invalid PDF URL:", pdfUrl);

      return Response.json(
        { success: false, error: "Invalid PDF URL" },
        { status: 400 }
      );
    }


    // ─────────────────────────────────────────────
    // Create transporter
    // ─────────────────────────────────────────────
    console.log("[EMAIL] Creating SMTP transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },

      // IMPORTANT: prevents silent hangs
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // ─────────────────────────────────────────────
    // Verify SMTP connection
    // ─────────────────────────────────────────────
    console.log("[EMAIL] Verifying SMTP connection...");

    await transporter.verify();

    console.log("[EMAIL] SMTP verified successfully");

    // ─────────────────────────────────────────────
    // Download PDF FIRST (avoids Gmail fetch issues)
    // ─────────────────────────────────────────────
    console.log("[EMAIL] Downloading PDF from:", pdfUrl);

    const pdfRes = await fetch(pdfUrl);

    if (!pdfRes.ok) {
      throw new Error(
        `[EMAIL] Failed to fetch PDF. Status: ${pdfRes.status}`
      );
    }

    const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());

    console.log("[EMAIL] PDF downloaded. Size:", pdfBuffer.length, "bytes");

    // ─────────────────────────────────────────────
    // Send email
    // ─────────────────────────────────────────────
    console.log("[EMAIL] Sending email to:",`${process.env.RECP_EMAIL}, ${leadData?.email}`,process.env.RECP_EMAIL);

    const info = await transporter.sendMail({
      from: `"Lume Corp " <${process.env.EMAIL_USER}>`,
      to: `${process.env.RECP_EMAIL}, ${leadData?.email}`,
      subject: `Your Event Proposal - ${summaryData?.eventName || "Event"}`,

      text: "Please find your event proposal attached.",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #222;">
    
        <h2 style="margin-bottom: 20px;">
          Dear ${leadData?.name || "Guest"},
        </h2>

        <p>
          Thank you for choosing us for your event planning experience.
          Please find your personalized proposal attached below.
        </p>

        <br/>

        <h3>Customer Details</h3>

        <p><b>Name:</b> ${leadData?.name}</p>
        <p><b>Phone:</b> ${leadData?.phone}</p>
        <p><b>Email:</b> ${leadData?.email}</p>

        <br/>

        <h3>Event Details</h3>

        <p><b>Event:</b> ${summaryData?.eventName}</p>
        <p><b>Budget:</b> ₹${summaryData?.budget}L</p>
        <p><b>Guests:</b> ${summaryData?.guestCount}</p>
        <p><b>Estimated Fee:</b> ₹${quotation?.total}L</p>

        <br/>

        <p>Attached is your full PDF proposal.</p>
        <p>
          Regards,<br/>
          EventCraft Team
        </p>

      </div>
      `,

      attachments: [
        {
          filename: "event-proposal.pdf",
          content: pdfBuffer,
        },
      ],
    });

    console.log("[EMAIL] Email sent successfully!");
    console.log("[EMAIL] Message ID:", info.messageId);

    console.log(
      `[EMAIL] Total execution time: ${Date.now() - startTime}ms`
    );

    console.log("\n================ EMAIL API END ================\n");

    return Response.json({
      success: true,
      messageId: info.messageId,
      timeMs: Date.now() - startTime,
    });
  } catch (err) {
    console.error("\n!!!!!!!!!!!!!!!! EMAIL ERROR !!!!!!!!!!!!!!!!");

    console.error("[EMAIL] Message:", err.message);
    console.error("[EMAIL] Code:", err.code);
    console.error("[EMAIL] Command:", err.command);
    console.error("[EMAIL] Stack:", err.stack);

    // dump full error object (VERY useful for ECONNRESET debugging)
    console.error(
      "[EMAIL] Full error object:",
      JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
    );

    console.error("!!!!!!!!!!!!!!!! EMAIL END ERROR !!!!!!!!!!!!!!!!\n");

    return Response.json(
      {
        success: false,
        error: err.message || "Failed to send email",
        code: err.code || null,
      },
      { status: 500 }
    );
  }
}