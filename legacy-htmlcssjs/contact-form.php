<?php
// Contact form handler for Darius Garage
// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Set content type
header('Content-Type: application/json');

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');
$gdpr = isset($_POST['gdpr']) ? $_POST['gdpr'] : '';

// Basic validation
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Vyplňte všetky povinné polia (meno, email, predmet, správa).']));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Neplatný email formát.']));
}

if (empty($gdpr)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Musíte súhlasiť so spracovaním osobných údajov.']));
}

// Convert subject dropdown to readable text
$subject_map = [
    'booking' => 'Nová rezervácia',
    'modification' => 'Úprava existujúcej rezervácie',
    'support' => 'Zákaznícka podpora',
    'complaint' => 'Sťažnosť',
    'feedback' => 'Všeobecná spätná väzba',
    'other' => 'Iné'
];

$subject_text = $subject_map[$subject] ?? $subject;

// Prepare email content
$to = 'info@dariusgarage.sk';
$email_subject = 'Nová správa z Autopožičovňa Michalovce kontaktného formulára - ' . $subject_text;

// Create email body
$email_body = "Nová správa z Autopožičovňa Michalovce kontaktného formulára\n\n";
$email_body .= "Meno: $name\n";
$email_body .= "Email: $email\n";
if (!empty($phone)) $email_body .= "Telefón: $phone\n";
$email_body .= "Predmet: $subject_text\n";
$email_body .= "Správa: $message\n\n";
$email_body .= "Čas odoslania: " . date('d.m.Y H:i:s') . "\n";
$email_body .= "Odoslané cez: autopozicovnamichalovce.sk";

// Email headers - improved format
$header_string = "From: web@autopozicovnamichalovce.sk\r\n";
$header_string .= "Reply-To: $email\r\n";
$header_string .= "Return-Path: web@autopozicovnamichalovce.sk\r\n";
$header_string .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$header_string .= "MIME-Version: 1.0\r\n";
$header_string .= "Content-Type: text/plain; charset=UTF-8\r\n";
$header_string .= "Content-Transfer-Encoding: 8bit\r\n";

// Try to send email
if (mail($to, $email_subject, $email_body, $header_string)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Správa bola úspešne odoslaná. Ďakujeme za kontakt!'
    ]);
} else {
    error_log("Contact form mail sending failed for: $name <$email>");
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Nepodarilo sa odoslať správu. Skúste to prosím neskôr alebo nás kontaktujte telefonicky na 0951 350 640.'
    ]);
}
?>