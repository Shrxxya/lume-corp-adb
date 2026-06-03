import { pdf } from "@react-pdf/renderer";
import ReceiptPDF from "@/components/pdf/ReceiptPDF";

export async function POST(req) {
  try {
    // const {
    //   bookingId,
    //   paymentDate,
    //   amount,
    //   leadData,
    //   eventName,
    // } = await req.json();
    const {
    paymentInfo,
    leadData,
    summaryData,
    } = await req.json();

    // const doc = (
    //   <ReceiptPDF
    //     bookingId={bookingId}
    //     paymentDate={paymentDate}
    //     amount={amount}
    //     leadData={leadData}
    //     eventName={eventName}
    //   />
    // );

    const doc = (
    <ReceiptPDF
        bookingId={paymentInfo?.bookingId}
        paymentDate={paymentInfo?.date}
        amount={paymentInfo?.amount}
        leadData={leadData}
        eventName={summaryData?.eventName}
    />
    );

    const blob = await pdf(doc).toBlob();

    const arrayBuffer = await blob.arrayBuffer();

    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const file = `data:application/pdf;base64,${base64}`;

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
      { error: "Receipt PDF generation failed" },
      { status: 500 }
    );
  }
}