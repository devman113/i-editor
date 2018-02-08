<?php
  header("Access-Control-Allow-Origin: *");

  $result = array();
  foreach(glob("./*.*") as $filename) {
    $ext = end(explode(".", $filename));
    if ($ext == "jpg" || $ext == "png") {
      $arr = explode("/", $filename);
      array_push($result, $arr[1]);
    }
  }
  
  echo json_encode($result);
?>