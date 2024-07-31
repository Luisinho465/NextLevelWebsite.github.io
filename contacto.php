<?php

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if (empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['message']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo "No arguments provided!";
    return false;
}

$nome = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$mensagem = strip_tags(htmlspecialchars($_POST['message']));

try {
    $mailAdmin = new PHPMailer\PHPMailer\PHPMailer();
    $mailAdmin->isSMTP();
    $mailAdmin->Host       = 'smtp.gmail.com'; // SMTP server
    $mailAdmin->SMTPAuth   = true;
    $mailAdmin->Username   = 'nextlevelwebsite2010@gmail.com'; // Your email address
    $mailAdmin->Password   = 'lpni exhx zxmb dafm'; // Your email password
    $mailAdmin->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // Encryption protocol
    $mailAdmin->Port       = 587; // SMTP port for TLS

    $mailAdmin->setFrom($email, $nome);
    $mailAdmin->addAddress('nextlevelwebsite2010@gmail.com', 'Luis Nascimento'); // Admin email

    $mailAdmin->Subject = "Formulário do website NextLevel Website";

    // Determine greeting based on time of day
    $hora_atual = (int)date('G');
    if ($hora_atual >= 6 && $hora_atual < 12) {
        $saudacao = "Bom dia";
    } elseif ($hora_atual >= 12 && $hora_atual < 18) {
        $saudacao = "Boa tarde";
    } else {
        $saudacao = "Boa noite";
    }

    // Construct HTML body
    $bodyAdmin = '
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: "Helvetica Neue", Arial, sans-serif; background-color: #f5f5f5; color: #333; margin: 0; padding: 0; }
            #email-container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h1 { color: #007bff; }
            p { line-height: 1.5; }
            .thanks { font-weight: bold; color: #28a745; margin-top: 20px; }
            .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
    <div id="email-container">
        <h1>'.$saudacao.' Luís Nascimento</h1>
        <p>Você recebeu esta mensagem porque '.$nome.' enviou uma mensagem através do formulário do website.</p>
        <p>Email: '.$email.'</p>
        <p>Mensagem: '.$mensagem.'</p>
        <div class="footer">
            <p>Atenciosamente,</p>
            <p>A Equipa LuisPintoDecor</p>
        </div>
    </div>
    </body>
    </html>';

    $mailAdmin->msgHTML($bodyAdmin);

    if ($mailAdmin->send()) {
        header("Location: index.html#contact"); // Redireciona para a página de sucesso
        setcookie('notify_success', 'true', time() + (60 * 5), '/'); 
        exit(); // Garante que nenhum código adicional seja executado
    } else {
        setcookie('erro', 'true', time() + (60 * 5), '/'); 

        echo 'Erro ao enviar a mensagem: ' . $mailAdmin->ErrorInfo;
    }
} catch (Exception $e) {
    echo 'Erro ao enviar a mensagem: ' . $e->getMessage();
}
?>
