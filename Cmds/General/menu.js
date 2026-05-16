const { DateTime } = require('luxon');
const fs = require('fs');
const path = require('path');

module.exports = async (context) => {
    const { client, m, totalCommands, mode, botname, prefix, url, sendReply, sendMediaMessage, author } = context;

    try {
        const categories = [
            { name: 'AI', emoji: '🤖' },
            { name: 'General', emoji: '📋' },
            { name: 'Media', emoji: '🎬' },
            { name: 'Search', emoji: '🔍' },
            { name: 'Editting', emoji: '✂️' },
            { name: 'Groups', emoji: '👥' },
            { name: 'Fun', emoji: '🎉' },
            { name: 'Owner', emoji: '👑' },
            { name: 'Coding', emoji: '💻' },
            { name: 'Settings', emoji: '⚙️' },
            { name: 'Statistics', emoji: '📊' },
            { name: 'Utility', emoji: '🔧' },
            { name: 'System', emoji: '🖥️' },
            { name: 'Stalk', emoji: '🕵️' },
        ];

        const quotes = [
            "In the cyber world, knowledge is power.",
            "Code hard, hack smart.",
            "Every connection is an opportunity.",
            "The matrix has you.",
            "Stay encrypted, stay safe.",
            "Digital dominance is the future.",
            "Break limits, not laws.",
            "Cyberspace is the new frontier.",
            "Data is the new oil.",
            "Adapt or become obsolete.",
            "Access granted. Welcome to CYBER-X.",
        ];

        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
            if (currentHour >= 5 && currentHour < 12) return '⚡ Good Morning, Agent 🌅';
            if (currentHour >= 12 && currentHour < 18) return '⚡ Good Afternoon, Agent ☀️';
            if (currentHour >= 18 && currentHour < 22) return '⚡ Good Evening, Agent 🌆';
            return '⚡ Running Night Ops 😴';
        };

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const now = DateTime.now().setZone('Africa/Nairobi');

        const cmdsDir = path.join(__dirname, '../../Cmds');
        const categoryList = categories.map(cat => {
            const catPath = path.join(cmdsDir, cat.name);
            let count = 0;
            try {
                if (fs.existsSync(catPath)) {
                    count = fs.readdirSync(catPath).filter(f => f.endsWith('.js')).length;
                }
            } catch {}
            return `${cat.emoji} *${cat.name}*: ${count} cmds`;
        }).join('\n');

        const menuText = `
╔══════════════════════════╗
║   ⚡  *C Y B E R - X*  ⚡   ║
╚══════════════════════════╝

${getGreeting()}
📅 *Date:* ${now.toLocaleString(DateTime.DATE_FULL)}
🕐 *Time:* ${now.toLocaleString(DateTime.TIME_SIMPLE)}

*"${randomQuote}"*

━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 *Bot:* ${botname}
👑 *Owner:* ${author}
🔑 *Prefix:* ${prefix}
📡 *Mode:* ${mode}
⚡ *Total Commands:* ${totalCommands}+
━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 *COMMAND CATEGORIES*

${categoryList}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Usage:* ${prefix}<command>
📖 *Help:* ${prefix}help <command>
━━━━━━━━━━━━━━━━━━━━━━━━━━
> ⚡ *Powered by CYBER-X Bot v1.0.0*
`.trim();

        await sendMediaMessage(client, m, {
            image: { url: url },
            caption: menuText,
        });

    } catch (error) {
        console.error('Menu command error:', error);
        await sendReply(client, m, `❌ Error loading menu: ${error.message}`);
    }
};

module.exports.description = 'Display the CYBER-X bot menu';
module.exports.aliases = ['cmds', 'commands', 'list'];
module.exports.reaction = '⚡';
