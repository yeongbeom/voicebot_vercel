# Edge server setup

## Requirements

- Chromium browser 86

- Peripherals

  - Video/audio input devices (e.g. webcam)
  - Display/audio output device (e.g. touch display/speaker)

- Raspberry Pi OS settings

  - OS: Raspberry Pi OS Lite
  - System: 32-bit
  - Kernel version: 5.10
  - Debian version: 10 (buster)
  - Set up WIFI with on-screen keyboard
  - Go to the main menu and open the Raspberry Pi Configuration tool. Select the Interfaces tab and ensure that the camera is enabled. Reboot your Raspberry Pi.
  - Adjust audio volume
  - Screen resolution of 800 x 480 pixels
  - Auto-hide taskbar
  - Right-click on the taskbar and select "Panel Settings". Click on the "Advanced" tab, and check "Minimize panel when not in use".
  - Set local
  - Disable swipe to go back in chrome

    ```bash
    chrome://flags/#overscroll-history-navigation
    ```

    Open the dropdown under the ‘Overscroll history navigation ‘ flag, and select ‘Disable’ from the options. Relaunch Chrome.

  - Install Korean language

    ```bash
    sudo apt-get install fonts-unfonts-core
    sudo apt-get install ibus ibus-hangul
    sudo reboot
    ```

  - Install nodejs and packages

    ```bash
    curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
    ```

    ```bash
    sudo apt install nodejs git -y
    ```

    ```bash
    git clone https://github.com/hyunduk0206/voicebot.git
    cd voicebot/edge-server
    ```

    ```bash
    npm i
    npm run dev
    ```

## Media file install

### gdown

```bash
pip install gdown
```

### Media

```bash
/home/pi/.local/bin/gdown https://drive.google.com/drive/folders/1EzQYUTTUvaCoHJxrn7jCHh-MHFcdFe6- -O dist/ --folder
```
