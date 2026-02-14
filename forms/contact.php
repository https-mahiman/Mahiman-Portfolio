<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$env = parse_ini_file(__DIR__ . '/../.env');

require __DIR__ . '/../assets/vendor/PHPMailer-master/src/Exception.php';
require __DIR__ . '/../assets/vendor/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/../assets/vendor/PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'work.mahiman@gmail.com'; // your gmail
    $mail->Password = $env['APP_PASSWORD']; // app password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('work.mahiman@gmail.com', 'Portfolio Contact Form');
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    $mail->addAddress('work.mahiman@gmail.com');

    $mail->isHTML(false);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = "Name: ".$_POST['name'].
                     "\nEmail: ".$_POST['email'].
                     "\n\nMessage:\n".$_POST['message'];

    $mail->send();
    header("Location: ../index.html?status=success");
    exit();

} catch (Exception $e) {
    header("Location: ../index.html?status=error");
    exit();
}

