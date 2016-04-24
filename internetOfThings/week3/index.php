<?php  
$pir = $_GET['pir'];
if($pir == "on") {  
  $file = fopen("pir.txt", "w") or die("can't open file");
  fwrite($file, 'on');
  fclose($file);
} 
else if ($pir == "off") {  
  $file = fopen("pir.txt", "w") or die("can't open file");
  fwrite($file, 'off');
  fclose($file);
}
else if ($pir == "auto") {  
  $file = fopen("pir.txt", "w") or die("can't open file");
  fwrite($file, 'auto');
  fclose($file);
}
?>

<html>
<head>
    <link rel="stylesheet" href="style.css">

    <!-- Load c3.css -->
    <link href="c3/c3.css" rel="stylesheet" type="text/css">

    <!-- Load d3.js and c3.js -->
    <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script src="c3/c3.min.js"></script>

</head>
<body>

<?php 
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
      // Waarde wegschrijven naar bestand
      $data = $_POST["pir"];
      // Push data to text file

      $timestamp = new DateTime();
      $time = $timestamp->format('Y-m-d H:i:s');

      // $message = array("Time: " => .$timestamp->format('Y-m-d H:i:s'). , " pir: " => .$data.);

      $message = array("time" => $time, "pir" => $data);


        $inp = file_get_contents('test.json');
        $tempArray = json_decode($inp);
        array_push($tempArray, $message);
        $jsonData = json_encode($tempArray);
        file_put_contents('test.json', $jsonData);



      // file_put_contents("output.txt", print_r($message, true) . "\n", FILE_APPEND);
    }
?>

<?php
    // $inp = file_get_contents('test.json');
    // echo $inp;
    // $tempArray = json_decode($inp);
    // echo $tempArray;
?>




    <div class="turn">  

    </div> 
        <?php
            // $myfile = fopen("output.txt", "r") or die("Unable to open file!");
            // $output = fread($myfile,filesize("output.txt"));
            // fclose($myfile);
            // echo $output; 


// $data[] = $_POST['data'];

// $inp = file_get_contents('results.json');
// $tempArray = json_decode($inp);
// array_push($tempArray, $data);
// $jsonData = json_encode($tempArray);
// file_put_contents('results.json', $jsonData);

        ?>
    <h1>Cat away!</h1>
    <div class="buttons">
        <a href="?pir=off" class="aOff"><button id="off-leander" class="off">Pump off</button></a>
        <a href="?pir=auto" class="aAuto"><button id="auto-leander" class="auto">Pump auto</button></a>
        <a href="?pir=on" class="aOn"><button id="on-leander" class="on">Pump on</button></a>
        
    </div>

<!--     <div class="turn">
        <a href="output.txt" class="history">Check history</a>
    </div>
 -->
 <div class="chart-wrap">
    <div id="chart"></div>
</div>


    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="script.js"></script>

</body>
</html>