module.exports = async (context) => {
    const { client, m, args, isOwner, sendReply } = context;

    if (!isOwner) return await sendReply(client, m, '❌ Owner only command!');

    const name = args.join(' ');
    if (!name) return await sendReply(client, m, '❌ Provide a name!\nUsage: .setbotname <name>');

    try {
        await client.updateProfileName(name);
        await sendReply(client, m, `✅ Bot name updated to: *${name}*`);
    } catch (error) {
        await sendReply(client, m, `❌ Error: ${error.message}`);
    }
};

module.exports.description = 'Set the bot profile name (Owner only)';
module.exports.aliases = ['botname'];
module.exports.reaction = '✏️';
