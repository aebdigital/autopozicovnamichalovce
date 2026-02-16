import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, gdpr } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Vyplňte prosím všetky povinné polia." },
        { status: 400 }
      );
    }

    if (!gdpr) {
      return NextResponse.json(
        { success: false, message: "Musíte súhlasiť so spracovaním osobných údajov." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Zadajte prosím platnú emailovú adresu." },
        { status: 400 }
      );
    }

    const subjectMap: Record<string, string> = {
      booking: "Nová rezervácia",
      modification: "Úprava rezervácie",
      support: "Zákaznícka podpora",
      other: "Iné",
    };

    const subjectText = subjectMap[subject] || subject;

    const recipientEmail = process.env.CONTACT_FORM_RECIPIENT || "info@dariusgarage.sk";

    // Send email to admin
    const adminEmail = await sendEmail({
      to: recipientEmail,
      subject: `Kontaktný formulár: ${subjectText} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #E41C31;">Nová správa z webu</h2>
          <p><strong>Meno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefón:</strong> ${phone || "Neuvedené"}</p>
          <p><strong>Predmet:</strong> ${subjectText}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Správa:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (!adminEmail.success) {
      throw new Error(adminEmail.error);
    }

    return NextResponse.json({
      success: true,
      message: "Ďakujeme za vašu správu! Odpovieme vám čo najskôr.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Došlo k chybe pri odosielaní správy. Skúste to prosím neskôr." },
      { status: 500 }
    );
  }
}
