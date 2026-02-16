import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      carTitle,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      totalDays,
      totalPrice,
      servicesPrice,
      deposit,
      selectedServices,
      termsAccepted,
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !birthDate) {
      return NextResponse.json(
        { success: false, message: "Vyplňte prosím všetky povinné polia." },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { success: false, message: "Musíte súhlasiť s ochranou osobných údajov." },
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

    const locationMap: Record<string, string> = {
      michalovce: "Michalovce - Stavbárov 8",
      delivery: "Michalovce dovoz (+5€)",
      pickup: "Michalovce vyzdvihnutie (+5€)",
    };

    const pickupLocText = locationMap[pickupLocation] || pickupLocation;
    const returnLocText = locationMap[returnLocation] || returnLocation;

    // Email HTML content
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #E41C31; border-bottom: 2px solid #E41C31; padding-bottom: 10px;">Nová rezervácia vozidla</h2>
        
        <h3 style="color: #333;">Osobné údaje</h3>
        <p><strong>Meno:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefón:</strong> ${phone}</p>
        <p><strong>Dátum narodenia:</strong> ${birthDate}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Detaily rezervácie</h3>
        <p><strong>Vozidlo:</strong> ${carTitle}</p>
        <p><strong>Prevzatie:</strong> ${pickupDate} o ${pickupTime} (${pickupLocText})</p>
        <p><strong>Vrátenie:</strong> ${returnDate} o ${returnTime} (${returnLocText})</p>
        <p><strong>Počet dní:</strong> ${totalDays}</p>
        
        <h3 style="color: #333; margin-top: 20px;">Finančné informácie</h3>
        <p><strong>Doplnkové služby:</strong> ${servicesPrice}€</p>
        <p><strong>Vratná kaucia:</strong> ${deposit}€</p>
        <p style="font-size: 1.2em; color: #E41C31;"><strong>Celková cena: ${totalPrice}€</strong></p>
        
        <div style="margin-top: 20px; padding: 10px; background: #f9f9f9; border-radius: 5px;">
          <p><strong>Zvolené služby:</strong> ${selectedServices.length > 0 ? selectedServices.join(", ") : "Žiadne"}</p>
        </div>
      </div>
    `;

    const adminRecipient = process.env.RESERVATION_RECIPIENT || "info@dariusgarage.sk";

    // Send email to admin
    await sendEmail({
      to: adminRecipient,
      subject: `Nová rezervácia: ${carTitle} - ${firstName} ${lastName}`,
      html: emailHtml,
    });

    // Send confirmation to customer
    await sendEmail({
      to: email,
      subject: `Potvrdenie prijatia rezervácie - Darius Garage`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #E41C31;">Dobrý deň, ${firstName},</h2>
          <p>Ďakujeme za váš záujem o prenájom vozidla v <strong>Darius Garage</strong>. Vaša požiadavka bola úspešne prijatá a momentálne ju spracovávame.</p>
          <p>Náš pracovník vás bude v krátkom čase kontaktovať pre potvrdenie rezervácie a dohodnutie detailov.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          ${emailHtml}
          <div style="margin-top: 20px; text-align: center; color: #999; font-size: 0.8em;">
            <p>Darius Garage s. r. o. | Stavbárov 8, 071 01 Michalovce</p>
            <p>0951 350 640 | info@dariusgarage.sk</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message:
        "Ďakujeme za vašu rezerváciu! Vaša požiadavka bola úspešne odoslaná. Budeme vás kontaktovať na potvrdenie rezervácie.",
    });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { success: false, message: "Došlo k chybe pri spracovaní rezervácie." },
      { status: 500 }
    );
  }
}
