<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
//$tel = htmlspecialchars($_POST["tel"]);

$check = is_array($_POST['check']) ? $_POST['check'] : array();
$check = implode (', ', $check );

$radio = htmlspecialchars($_POST["type"]);

$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год
$time=date("H:i"); // часы:минуты:секунды
$myemail = "andrey.demidenko39@yandex.ru";

$tema = "New order";
$message_to_myemail = "Текст письма:
<br><br>
Name: $name<br>
E-mail: $email<br>
Type: $radio<br>
Referrer (link): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: test <test.ru> \r\n Reply-To: test \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


$tema = "Thank you";
$message_to_myemail = "
Thanks for your question! We will reply you soon.<br>
";
$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: test <test@mail.ru> \r\n Reply-To: test \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


//$f = fopen("leads.xls", "a+");
//fwrite($f," <tr>");
//fwrite($f," <td>$email</td> <td>$name</td> <td>$tel</td>   <td>$date / $time</td>");
//fwrite($f," <td>$refferer</td>");
//fwrite($f," </tr>");
//fwrite($f,"\n ");
//fclose($f);


?>
