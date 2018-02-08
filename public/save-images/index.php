<?php
    header("Access-Control-Allow-Origin: *");

  if (isset($_POST['image']) && isset($_POST['filename'])) {
      saveImage($_POST['image'], $_POST['filename']);
  }

  echo "ok";

  function saveImage($image, $filename) {
      $ifp = fopen($filename, 'wb');
      fwrite($ifp, base64_decode($image));
      fclose($ifp);
  }
?>