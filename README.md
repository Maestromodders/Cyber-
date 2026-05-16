# ⚡ CYBER-X WhatsApp Bot

```
╔══════════════════════════════════╗
║   ⚡  C Y B E R - X  B O T  ⚡   ║
║   WhatsApp Multi-Device Bot      ║
╚══════════════════════════════════╝
```

> A powerful, feature-rich WhatsApp bot built on Baileys (Multi-Device)

---

## 🚀 Features

- ⚡ **AI Commands** – ChatGPT, Gemini, DeepSeek, Bing AI
- 🎬 **Media Downloader** – YouTube, TikTok, Instagram, Facebook, Spotify
- 🔍 **Search Engine** – Google, Wikipedia, News, Weather
- ✂️ **Sticker Maker** – Image/Video to sticker with EXIF
- 👥 **Group Management** – Anti-link, anti-spam, welcome/goodbye
- 🛡️ **Protection** – Anti-call, anti-bad, anti-tag, anti-delete
- 💻 **Code Runner** – Python, JavaScript, C, C++, Java
- 🎉 **Fun Commands** – Jokes, facts, games, quotes
- 📊 **Statistics** – Calculator, time, timezone
- 🔧 **Utilities** – Audio/video tools, FFmpeg processing
- 🕵️ **Stalk Tools** – IP stalk, GitHub stalk, TikTok stalk

---

## 📋 Requirements

- Node.js **v20+**
- npm v9+
- FFmpeg installed
- A WhatsApp account

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/CYBER-X.git
cd CYBER-X
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
nano .env
```

Fill in your details (see Configuration below).

### 4. Get your Session String

Run the bot once to pair your number:
```bash
node index.js
```

Enter your number when prompted. Copy the session string and add it to your `.env`.

### 5. Start the bot
```bash
npm start
```

---

## 🔧 Configuration

Edit your `.env` file:

| Variable | Description | Default |
|---|---|---|
| `SESSION` | WhatsApp session string | *(required)* |
| `OWNER_NUMBER` | Your phone number (no +) | *(required)* |
| `BOTNAME` | Bot's display name | `CYBER-X` |
| `OWNER_NAME` | Your name | `YourName` |
| `PREFIX` | Command prefix | `.` |
| `MODE` | `public` or `private` | `public` |
| `TIMEZONE` | Your timezone | `Africa/Nairobi` |
| `ANTICALL` | Block calls | `true` |
| `ANTILINK` | Block links in groups | `true` |
| `CHATBOT` | Auto-reply chatbot | `false` |
| `AUTOVIEW_STATUS` | Auto view statuses | `true` |

See `.env.example` for all options.

---

## 📂 Project Structure

```
CYBER-X/
├── index.js              # Main bot file
├── settings.js           # Configuration loader
├── commandHandler.js     # Command registry
├── groupEvents.js        # Group event handlers
├── package.json          # Dependencies
├── .env.example          # Environment template
├── Cmds/                 # All commands
│   ├── AI/               # AI commands
│   ├── Coding/           # Code runner
│   ├── Editting/         # Media editing
│   ├── Fun/              # Fun commands
│   ├── General/          # General commands
│   ├── Groups/           # Group management
│   ├── Media/            # Downloaders
│   ├── Owner/            # Owner-only commands
│   ├── Search/           # Search commands
│   ├── Settings/         # Bot settings
│   ├── Stalk/            # Stalk tools
│   ├── Statistics/       # Stats commands
│   ├── System/           # System commands
│   └── Utility/          # Utility commands
├── lib/                  # Core libraries
│   ├── botFunctions.js   # Helper functions
│   ├── smsg.js           # Message serializer
│   ├── dl.js             # Download functions
│   ├── exif.js           # Sticker EXIF writer
│   └── ...
├── session/              # Auth session files
└── public/               # Web UI files
```

---

## 🚀 Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set SESSION=your_session
heroku config:set OWNER_NUMBER=254700000000
# ... add all other env vars
git push heroku main
```

### Railway / Render
1. Fork this repo
2. Connect to Railway or Render
3. Add environment variables from `.env.example`
4. Deploy

### VPS / Linux Server
```bash
npm install -g pm2
pm2 start index.js --name "CYBER-X"
pm2 save
pm2 startup
```

---

## 📖 Usage

Send `.menu` in WhatsApp to see all commands.

```
.menu       - Show all commands
.help       - Get command help
.ping       - Check bot speed
.alive      - Bot status
.sticker    - Make sticker (reply to image)
.ai Hello   - Ask AI
```

---

## 🛡️ License

MIT License – see [LICENSE](LICENSE) for details.

---

## ⚡ CYBER-X Bot

> *"In the cyber world, knowledge is power."*

Built with 💙 using [Baileys](https://github.com/WhiskeySockets/Baileys)
