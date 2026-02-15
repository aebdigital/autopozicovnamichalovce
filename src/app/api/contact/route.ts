import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, gdpr } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Vyplnte prosim vsetky povinne polia." },
        { status: 400 }
      );
    }

    if (!gdpr) {
      return NextResponse.json(
        { success: false, message: "Musite suhlasit so spracovanim osobnych udajov." },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Zadajte prosim platnu emailovu adresu." },
        { status: 400 }
      );
    }

    // Map subject to readable text
    const subjectMap: Record<string, string> = {
      booking: "Nova rezervacia",
      modification: "Uprava existujucej rezervacie",
      support: "Zakaznicka podpora",
      complaint: "Staznost",
      feedback: "Vseobecna spatna vazba",
      other: "Ine",
    };

    const subjectText = subjectMap[subject] || subject;

    // TODO: Integrate with your email service (e.g., Resend, SendGrid, Nodemailer)
    // For now, log the data
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject: subjectText,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Dakujeme za vasu spravu! Odpovieme vam co najskor.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Doslo k chybe pri spracovani spravy." },
      { status: 500 }
    );
  }
}
