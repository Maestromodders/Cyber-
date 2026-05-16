/*
 * ╔═══════════════════════════════════════════════╗
 * ║       CYBER-X Group Events Handler            ║
 * ╚═══════════════════════════════════════════════╝
 */

const events = process.env.EVENTS || 'false';
const botname = process.env.BOTNAME || 'CYBER-X';

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363266249040649@newsletter',
            newsletterName: 'CYBER-X Support',
            serverMessageId: 143,
        },
    };
};

const Events = async (client, keizzah) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(keizzah.id);
        let participants = keizzah.participants;
        let desc = metadata.desc || 'No Description';
        let groupMembersCount = metadata.participants.length;

        for (let num of participants) {
            let dpuser;
            let userName = num.split('@')[0];

            try {
                dpuser = await client.profilePictureUrl(num, 'image');
            } catch {
                dpuser = 'https://i.imgur.com/iEWHnOH.jpeg';
            }

            const timeJoined = new Date().toLocaleString();
            const timeLeft = new Date().toLocaleString();

            if (keizzah.action === 'add') {
                const WelcomeText = `╔══════════════════════╗
║  ⚡ *CYBER-X WELCOME* ⚡  ║
╚══════════════════════╝

Hey @${userName} 👋
Welcome to *${metadata.subject}*!

You are member number *${groupMembersCount}* 🎉
Time joined: *${timeJoined}*

📜 Please read the group description:
${desc}

> ⚡ *Powered by ${botname}*`;

                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: WelcomeText,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            } else if (keizzah.action === 'remove') {
                const GoodbyeText = `╔═════════════════════╗
║  ⚡ *CYBER-X GOODBYE* ⚡  ║
╚═════════════════════╝

Goodbye @${userName} 😔
Another agent has left *${metadata.subject}*.
Time left: *${timeLeft}*

We hope to see you again! 👋

> ⚡ *Powered by ${botname}*`;

                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        image: { url: dpuser },
                        caption: GoodbyeText,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            } else if (keizzah.action === 'promote') {
                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        text: `⚡ @${userName} has been *promoted to admin*! Congratulations! 🎉`,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            } else if (keizzah.action === 'demote') {
                if (events === 'true') {
                    await client.sendMessage(keizzah.id, {
                        text: `⚡ @${userName} has been *demoted from admin*.`,
                        mentions: [num],
                        contextInfo: getContextInfo({ sender: Myself }),
                    });
                }
            }
        }
    } catch (error) {
        console.error('Group event error:', error);
    }
};

module.exports = Events;
