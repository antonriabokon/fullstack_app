<?php
include "DBConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$objectDB = new DBConnect();
$conn = $objectDB->connect();

$inputData = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case "POST":
    $user = json_decode($inputData);
    $stmt = $conn->prepare("INSERT INTO users (name, email, mobile, created_at, updated_at) VALUES (:name, :email, :mobile, :created_at, :updated_at)");
    $now = date('Y-m-d');
    $stmt->bindParam(':name', $user->name);
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':mobile', $user->mobile);
    $stmt->bindParam(':created_at', $now);
    $stmt->bindParam(':updated_at', $now);

    $result = $stmt->execute();

    echo json_encode([
      'status' => $result ? 1 : 0,
      'message' => $result ? 'Record created successfully' : 'Failed to create record'
    ]);
    break;

  case "GET":
    $stmt = $conn->prepare("SELECT * FROM users");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    break;

  case "DELETE":
    $id = (int) basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    if ($id) {
      $stmt = $conn->prepare("DELETE FROM users WHERE id = :id");
      $stmt->bindParam(':id', $id);
      echo json_encode([
        'status' => $stmt->execute() ? 1 : 0,
        'message' => $stmt->execute() ? 'Record deleted successfully' : 'Failed to delete record'
      ]);
    } else {
      http_response_code(400);
      echo json_encode(['status' => 0, 'message' => 'Invalid ID']);
    }
    break;

  case "PUT":
    $user = json_decode($inputData);
    $id = (int) basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    if ($id) {
      $stmt = $conn->prepare("UPDATE users SET name = :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id");
      $now = date('Y-m-d');
      $stmt->bindParam(':name', $user->name);
      $stmt->bindParam(':email', $user->email);
      $stmt->bindParam(':mobile', $user->mobile);
      $stmt->bindParam(':updated_at', $now);
      $stmt->bindParam(':id', $id);
      echo json_encode([
        'status' => $stmt->execute() ? 1 : 0,
        'message' => $stmt->execute() ? 'Record updated successfully' : 'Failed to update record'
      ]);
    } else {
      http_response_code(400);
      echo json_encode(['status' => 0, 'message' => 'Invalid ID']);
    }
    break;

  default:
    http_response_code(405);
    echo json_encode(['status' => 0, 'message' => 'Method not allowed']);
    break;
}
?>