const { DateTime } = require('luxon');
const { performance } = require('perf_hooks');
const os = require('os');

module.exports = async (context) => {
    const { client, m, botname, author, prefix, mode, url, sendMediaMessage, sendReply } = context;

    try {
        const start = performance.now();
        const now = DateTime.now().setZone(process.env.TIMEZONE || 'Africa/Nairobi');
        const ping = (performance.now() - start).toFixed(2);

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const memUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const memTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const platform = os.platform();
        const nodeVersion = process.version;

        const aliveText = `
╔══════════════════════════╗
║  ⚡  *C Y B E R - X*  ⚡   ║
║    *System Status Report*    ║
╚══════════════════════════╝

🟢 *Status:* Online & Active
🤖 *Bot:* ${botname}
👑 *Owner:* ${author}
🔑 *Prefix:* ${prefix}
📡 *Mode:* ${mode}
⚡ *Version:* 1.0.0

━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 *SYSTEM INFO*

⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
🏓 *Ping:* ${ping}ms
💾 *RAM:* ${memUsed} MB used
💻 *Platform:* ${platform}
🟩 *Node.js:* ${nodeVersion}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 *Time:* ${now.toLocaleString(DateTime.TIME_SIMPLE)}
📅 *Date:* ${now.toLocaleString(DateTime.DATE_MED)}
━━━━━━━━━━━━━━━━━━━━━━━━━━

> ⚡ *CYBER-X is fully operational!*
`.trim();

        await sendMediaMessage(client, m, {
            image: { url: url || 'https://i.imgur.com/iEWHnOH.jpeg' },
            caption: aliveText,
        });

    } catch (error) {
        await sendReply(client, m, `❌ Alive error: ${error.message}`);
    }
};

module.exports.description = 'Check if CYBER-X bot is alive and view system status';
module.exports.aliases = ['status', 'online', 'running'];
module.exports.reaction = '🟢';
