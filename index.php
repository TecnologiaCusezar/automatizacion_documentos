<?php

$char = $argv[1];
echo "MD5 para \"".$char."\": ".md5($char)." -> ".strlen(md5($char));
echo "\n";
echo "SHA1 para \"".$char."\": ".sha1($char)." -> ".strlen(sha1($char));