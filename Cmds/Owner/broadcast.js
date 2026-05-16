module.exports = async (context) => {
    const { client, m, args, isOwner, sendReply } = context;

    if (!isOwner) return await sendReply(client, m, '❌ This command is for the *Bot Owner* only!');

    const text = args.join(' ');
    if (!text) return await sendReply(client, m, '❌ Please provide a message to broadcast.\n\nUsage: .broadcast <message>');

    try {
        const groups = await client.groupFetchAllParticipating();
        const groupIds = Object.keys(groups);
        let sent = 0;
        let failed = 0;

        const broadcastMsg = `
📢 *CYBER-X BROADCAST*
━━━━━━━━━━━━━━━━━━━━━━
${text}
━━━━━━━━━━━━━━━━━━━━━━
> ⚡ *Powered by CYBER-X Bot*
`.trim();

        await sendReply(client, m, `📡 Broadcasting to *${groupIds.length}* groups...`);

        for (const id of groupIds) {
            try {
                await client.sendMessage(id, { text: broadcastMsg });
                sent++;
                await new Promise(r => setTimeout(r, 1000));
            } catch {
                failed++;
            }
        }

        await sendReply(client, m, `✅ Broadcast complete!\n✔️ Sent: ${sent}\n❌ Failed: ${failed}`);
    } catch (error) {
        await sendReply(client, m, `❌ Broadcast error: ${error.message}`);
    }
};

module.exports.description = 'Broadcast a message to all groups (Owner only)';
module.exports.aliases = ['bc', 'announce'];
module.exports.reaction = '📢';
