sleep 5
# node ~/voicebot/edge-server/dist/index.js &
cd /home/pi/voicebot/edge-server
npm start 
sleep 5
#/usr/bin/chromium --noerrdialogs --disable-infobars --kiosk https://voicebot.vercel.app/
chromium-browser --noerrdialogs --disable-infobars --kiosk https://voicebot.vercel.app/