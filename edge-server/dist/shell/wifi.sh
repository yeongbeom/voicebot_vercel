wpa_cli remove_network all
wpa_cli save_config
sleep 1
wpa_cli add_network
wpa_cli set_network 0 ssid \"$1\"
wpa_cli set_network 0 psk \"$2\"
wpa_cli enable 0
wpa_cli save_config
wpa_cli select_network 0
wpa_cli list_network

sudo killall wpa_supplicant
sleep 1
sudo wpa_supplicant -B -c /etc/wpa_supplicant/wpa_supplicant.conf -i wlan0