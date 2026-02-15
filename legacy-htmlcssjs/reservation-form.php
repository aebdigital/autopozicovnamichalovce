<?php
// Reservation form handler for Darius Garage
// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Method not allowed']));
}

// Set content type
header('Content-Type: application/json');

// Get reservation data
$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$birthDate = trim($_POST['birthDate'] ?? '');

// Car and reservation details
$carTitle = trim($_POST['carTitle'] ?? '');
$pickupDate = trim($_POST['pickupDate'] ?? '');
$returnDate = trim($_POST['returnDate'] ?? '');
$pickupTime = trim($_POST['pickupTime'] ?? '');
$returnTime = trim($_POST['returnTime'] ?? '');
$pickupLocation = trim($_POST['pickupLocation'] ?? '');
$returnLocation = trim($_POST['returnLocation'] ?? '');
$totalDays = trim($_POST['totalDays'] ?? '');
$totalPrice = trim($_POST['totalPrice'] ?? '');
$deposit = trim($_POST['deposit'] ?? '500');

// Services (optional)
$selectedServices = $_POST['selectedServices'] ?? '[]';
if (is_string($selectedServices)) {
    $selectedServices = json_decode($selectedServices, true) ?? [];
}
$servicesPrice = trim($_POST['servicesPrice'] ?? '0');

$termsAccepted = isset($_POST['termsAccepted']) ? $_POST['termsAccepted'] : '';

// Basic validation
if (empty($firstName) || empty($lastName) || empty($email) || empty($phone) || empty($birthDate)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Vyplňte všetky povinné osobné údaje.']));
}

if (empty($carTitle) || empty($pickupDate) || empty($returnDate) || empty($pickupTime) || empty($returnTime)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Vyplňte všetky povinné údaje o rezervácii.']));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Neplatný email formát.']));
}

if (empty($termsAccepted)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Musíte súhlasiť s ochranou osobných údajov.']));
}

// Location mapping
$location_map = [
    'michalovce' => 'Michalovce - Stavbárov 8',
    'kosice' => 'Košice - Letisko',
    'presov' => 'Prešov - Centrum',
    'delivery' => 'Michalovce dovoz (+5€)',
    'pickup' => 'Michalovce vyzdvihnutie (+5€)'
];

$pickup_location_text = $location_map[$pickupLocation] ?? $pickupLocation;
$return_location_text = $location_map[$returnLocation] ?? $returnLocation;

// Services mapping
$services_map = [
    'gps' => 'GPS navigácia (+15€)',
    'cleaning' => 'Čistenie vozidla (+35€)',
    'delivery' => 'Doručenie vozidla (+5€)',
    'pickup' => 'Prevzatie vozidla (+5€)'
];

$selected_services_text = '';
if (!empty($selectedServices)) {
    $services_list = [];
    foreach ($selectedServices as $service) {
        if (isset($services_map[$service])) {
            $services_list[] = $services_map[$service];
        }
    }
    $selected_services_text = implode(', ', $services_list);
}

// Prepare email content
$to = 'info@dariusgarage.sk';
$email_subject = 'Nová rezervácia z Autopožičovňa Michalovce - ' . $carTitle;

// Create email body
$email_body = "Nová rezervácia z Autopožičovňa Michalovce\n\n";
$email_body .= "=== OSOBNÉ ÚDAJE ===\n";
$email_body .= "Meno: $firstName $lastName\n";
$email_body .= "Email: $email\n";
$email_body .= "Telefón: $phone\n";
$email_body .= "Dátum narodenia: $birthDate\n\n";

$email_body .= "=== REZERVÁCIA ===\n";
$email_body .= "Vozidlo: $carTitle\n";
$email_body .= "Dátum prevzatia: $pickupDate o $pickupTime\n";
$email_body .= "Dátum vrátenia: $returnDate o $returnTime\n";
$email_body .= "Miesto prevzatia: $pickup_location_text\n";
$email_body .= "Miesto vrátenia: $return_location_text\n";
$email_body .= "Počet dní: $totalDays\n";

if (!empty($selected_services_text)) {
    $email_body .= "\n=== DODATOČNÉ SLUŽBY ===\n";
    $email_body .= "$selected_services_text\n";
    $email_body .= "Cena služieb: " . floatval($servicesPrice) . "€\n";
}

$email_body .= "\n=== CENOVÝ ROZPIS ===\n";

// Ensure we have numeric values
$totalPriceNum = floatval($totalPrice);
$servicesPriceNum = floatval($servicesPrice);
$basePriceNum = $totalPriceNum - $servicesPriceNum;

$email_body .= "Prenájom vozidla ($totalDays dní): {$basePriceNum}€\n";
$email_body .= "Dodatočné služby: {$servicesPriceNum}€\n";
$email_body .= "CELKOVÁ CENA: {$totalPriceNum}€\n";
$email_body .= "Vratná kaucia: {$deposit}€\n\n";

$email_body .= "Čas odoslania: " . date('d.m.Y H:i:s') . "\n";
$email_body .= "Odoslané cez: autopozicovnamichalovce.sk\n\n";
$email_body .= "POZN.: Toto je nezáväzný dopyt na rezerváciu. Zákazníka je potrebné kontaktovať na potvrdenie.";

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
        'message' => 'Rezervácia bola úspešne odoslaná. Budeme vás kontaktovať čo najskôr na potvrdenie!'
    ]);
} else {
    error_log("Reservation form mail sending failed for: $firstName $lastName <$email>");
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Nepodarilo sa odoslať rezerváciu. Skúste to prosím neskôr alebo nás kontaktujte telefonicky na 0951 350 640.'
    ]);
}
?>