const fs = require('fs');
const path = require('path');

module.exports = async (context) => {
    const { client, m, args, prefix, sendReply, botname } = context;

    try {
        if (!args[0]) {
            const helpText = `
╔══════════════════════════╗
║   ⚡  *C Y B E R - X*  ⚡   ║
╚══════════════════════════╝

📖 *HOW TO USE CYBER-X*

• *Basic Usage:* ${prefix}<command>
• *With Args:* ${prefix}<command> <text>
• *Reply Usage:* Reply to a message + ${prefix}<command>
• *Specific Help:* ${prefix}help <command>

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ *QUICK COMMANDS*

• ${prefix}menu - Full command list
• ${prefix}ping - Check bot response
• ${prefix}alive - Bot status
• ${prefix}sticker - Make sticker
• ${prefix}ai <text> - Ask AI
• ${prefix}play <song> - Download music
• ${prefix}ytv <video> - Download video
• ${prefix}tts <text> - Text to speech
• ${prefix}translate <lang> <text> - Translate
• ${prefix}weather <city> - Weather info
• ${prefix}joke - Random joke
• ${prefix}fact - Random fact

━━━━━━━━━━━━━━━━━━━━━━━━━━
> ⚡ *CYBER-X Bot v1.0.0*
`.trim();
            return await sendReply(client, m, helpText);
        }

        // Help for specific command
        const cmdName = args[0].toLowerCase();
        const cmdsDir = path.join(__dirname, '../../Cmds');
        let found = false;

        const searchDir = (dir) => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                if (fs.statSync(fullPath).isDirectory()) {
                    searchDir(fullPath);
                } else if (item === `${cmdName}.js`) {
                    const cmd = require(fullPath);
                    const helpText = `
⚡ *CYBER-X Command Help*

🔑 *Command:* ${prefix}${cmdName}
📝 *Description:* ${cmd.description || 'No description'}
🏷️ *Aliases:* ${cmd.aliases ? cmd.aliases.map(a => prefix + a).join(', ') : 'None'}
⚡ *Reaction:* ${cmd.reaction || 'None'}
`.trim();
                    sendReply(client, m, helpText);
                    found = true;
                }
            }
        };

        searchDir(cmdsDir);
        if (!found) await sendReply(client, m, `❌ Command *${cmdName}* not found. Use ${prefix}menu to see all commands.`);

    } catch (error) {
        await sendReply(client, m, `❌ Help error: ${error.message}`);
    }
};

module.exports.description = 'Get help for CYBER-X commands';
module.exports.aliases = ['h', 'cmdshelp'];
module.exports.reaction = '📖';
