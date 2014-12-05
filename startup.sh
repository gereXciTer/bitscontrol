# parts restart apache2
parts stop mongodb
pkill -f node
parts start mongodb
cd ~/workspace
node app.js
# cd ~/workspace/frontend && brunch watch