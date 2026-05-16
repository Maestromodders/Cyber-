const { performance } = require('perf_hooks');

module.exports = async (context) => {
    const { client, m, sendReply } = context;

    try {
        const start = performance.now();
        await client.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
        const end = performance.now();
        const responseTime = (end - start).toFixed(2);

        const pingText = `
╔══════════════════════╗
║  ⚡ *CYBER-X PING*  ⚡  ║
╚══════════════════════╝

🟢 *Status:* Online
⚡ *Speed:* ${responseTime}ms
🤖 *Bot:* CYBER-X v1.0.0
📡 *Connection:* Active

> ⚡ *CYBER-X is fully operational!*
`.trim();

        await sendReply(client, m, pingText);
    } catch (error) {
        await sendReply(client, m, `❌ Ping error: ${error.message}`);
    }
};

module.exports.description = 'Check CYBER-X bot response speed';
module.exports.aliases = ['speed', 'test'];
module.exports.reaction = '⚡';
