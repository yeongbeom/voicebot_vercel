<h1 align='center'>
  <img src='static/diagram.png' alt='system diagram' width='700'>
</h1>

# Prerequisite

- Docker
- Node v16

For edge device, see edge-server/README.md

# Getting started

## Method 1: local build

### Database (docker)

```bash
docker pull postgres
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

### `dotenv` file

Create `.env` file in the project's root directory. Open the file and add the following line of code:

```bash
DATABASE_URL='postgres://postgres:mysecretpassword@localhost:5432/database'
VITE_TTS_API_KEY_0={api-key}
VITE_TTS_API_KEY_1={api-key}
VITE_TTS_API_KEY_2={api-key}
VITE_TTS_API_KEY_3={api-key}
VITE_TTS_API_KEY_4={api-key}
VITE_TTS_API_KEY_5={api-key}
VITE_WEATHER_API_KEY={api-key}
```

### Run

```bash
npm i
npm run dev -- --host --https
```

## Method 2: web IDE using Gitpod

1. Join Gitpod and install Gitpod chrome extension

   https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki

2. Go to https://gitpod.io/account, allow permissions for Github integration and add env info (e.g. API keys)

3. Navigate to your project’s GitHub and click green Gitpod button that the Gitpod Chrome extension created

4. It runs automatically

# Mis.

### Weather API (Current Weather Data)

https://openweathermap.org/api

### TTS API (Kakao)

https://speech-api.kakao.com/
