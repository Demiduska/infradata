<?php

define('MODX_API_MODE', true);
require_once dirname(dirname(__FILE__)) . '/index.php'; //путь до index.php, который лежит в корне

$modx->getService('error', 'error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
// Откликаться будет ТОЛЬКО на ajax запросы
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {return;}

// Сниппет будет обрабатывать не один вид запросов, поэтому работать будем по запрашиваемому действию
// Если в массиве POST нет действия - выход
if (empty($_POST['action'])) {return;}

// А если есть - работаем
$res = '';
switch ($_POST['action']) {
  case 'getCategories':
    $res .= '<div>';
    $res .= '<h3>Категории</h3>';
    $res .= '<div class="text--body m-xl-t-20">Выберите категорию, чтобы перейти к списку товаров в каталоге.</div>';
    $res .= '</div>';
    $res .= '<div class="popup__content-main">';
    $res .= '</div>';
    break;
  case 'getVendors':
    $params = array();
    $params['class'] = 'msVendor';
    $params['sortby'] = 'name';
    $params['sortdir'] = 'ASC';
    $params['limit'] = 0;
    $params['tpl'] = 'tpl.popup_vendor';
    $items = $modx->runSnippet('pdoResources', $params);
    $res .= '<div>';
    $res .= '<h3>Производители</h3>';
    $res .= '<div class="text--body m-xl-t-20">Выберите производителя, чтобы перейти к списку товаров в каталоге.</div>';
    $res .= '</div>';
    $res .= '<div class="popup__content-main">';
    $res .= $items;
    $res .= '</div>';
    break;
  // А вот сюда потом добавлять новые методы
}

// Если у нас есть, что отдать на запрос - отдаем и прерываем работу парсера MODX
if (!empty($res)) {
  die($res);
}
