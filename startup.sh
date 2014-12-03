# parts restart apache2
pkill -f node
cd ~/workspace
node app.js
# cd ~/workspace/frontend && brunch watch