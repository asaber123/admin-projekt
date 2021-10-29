<?php
if(!isset($_SESSION['username'])){
session_start();}
session_destroy();

header("Location: index.php");