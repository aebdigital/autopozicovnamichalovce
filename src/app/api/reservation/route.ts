import { NextResponse } from "next/server";

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

    // Map location values to readable text
    const locationMap: Record<string, string> = {
      michalovce: "Michalovce - Stavbárov 8",
      delivery: "Michalovce dovoz (+5€)",
      pickup: "Michalovce vyzdvihnutie (+5€)",
    };

    // TODO: Integrate with your email service (e.g., Resend, SendGrid, Nodemailer)
    // For now, log the reservation data
    console.log("Reservation submission:", {
      personalInfo: { firstName, lastName, email, phone, birthDate },
      reservation: {
        car: carTitle,
        pickupDate,
        returnDate,
        pickupTime,
        returnTime,
        pickupLocation: locationMap[pickupLocation] || pickupLocation,
        returnLocation: locationMap[returnLocation] || returnLocation,
        totalDays,
        totalPrice,
        servicesPrice,
        deposit,
        selectedServices,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Ďakujeme za vašu rezerváciu! Vaša požiadavka bola úspešne odoslaná. Budeme vás kontaktovať na potvrdenie rezervácie.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Došlo k chybe pri spracovaní rezervácie." },
      { status: 500 }
    );
  }
}
