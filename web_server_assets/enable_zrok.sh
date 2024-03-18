#!/bin/sh

zrok="/zrok/zrok"

$zrok enable ${ZROK_TOKEN} --headless
$zrok reserve public 3000 -n ${ZROK_DOMAIN}

npm run start &

$zrok share reserved ${ZROK_DOMAIN} --headless -p
