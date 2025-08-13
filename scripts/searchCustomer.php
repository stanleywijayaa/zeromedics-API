<?php
// search user by email, username or both
$email = $_POST['email'] ?? $email;
$username = $_POST['username'] ?? $username;

$data = [];
if(!empty($email)) $data['email'] = $email;
if(!empty($username)) $data['username'] = $username;

// Initialize cURL
$ch = curl_init("http://localhost:3000/customer");

// Execute request
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
    curl_close($ch);
    exit;
}
curl_close($ch);

// Decode JSON response
$customers = json_decode($response, true);

// Check if customer found
if (!empty($customers) && isset($customers[0]['id'])) {
    $customer_id = $customers[0]['id'];
    $first_name = $customers[0]['first_name'];
    $last_name = $customers[0]['last_name'];
    $username = $customers[0]['username'];
    $email = $customers[0]['email'];
    echo "✅ Customer ID: $customer_id\n";
    echo "✅ Customer First Name: $first_name\n";
    echo "✅ Customer Last Name: $last_name\n";
    echo "✅ Customer Username: $username\n";
    echo "✅ Customer Email: $email\n";
} else {
    echo "❌ Customer not found";
}
?>