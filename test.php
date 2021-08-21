<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c698a169fb.js" crossorigin="anonymous"></script>

</head>

<body>
<?php 
    class Creneau{
        public $debut;
        public $fin;

        public function __construct(int $d, int $f)
        {
           $this->debut=$d;
           $this->fin=$f; 
        }
    
    public function toHTML():string{
        return "De <strong>{$this->debut} h à {$this->fin} h</strong>";
    }
}
$cr= new Creneau(12,14);
echo $cr->toHTML();
    ?>

</body>
</html>