export async function sendEmail({ to, subject, html, text }: { to: string, subject: string, html: string, text?: string }) {
    const API_KEY = process.env.SMTP2GO_API_KEY;
    const SENDER = process.env.SMTP_FROM_EMAIL || "info@dariusgarage.sk";

    if (!API_KEY) {
        console.error("SMTP2GO_API_KEY is not defined");
        return { success: false, error: "Email configuration missing" };
    }

    try {
        const response = await fetch("https://api.smtp2go.com/v3/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: API_KEY,
                sender: SENDER,
                to: [to],
                subject: subject,
                html_body: html,
                text_body: text || html.replace(/<[^>]*>?/gm, ''),
            }),
        });

        const data = await response.json();

        if (data.data && data.data.succeeded > 0) {
            return { success: true };
        } else {
            console.error("SMTP2GO Error:", data);
            return { success: false, error: data.data?.error || "Failed to send email" };
        }
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, error: "Internal server error" };
    }
}
