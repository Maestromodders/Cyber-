const TEMPNUMBER_API_URL = 'https://CYBER-X-api.vercel.app/api/tempnumber';
const TEMPNUMBER_CODE_API_URL = 'https://CYBER-X-api.vercel.app/api/tempnumbercode';

module.exports = async (context) => {
    const { client, m } = context;

    try {
        // Fetch tempnumber data
        const tempNumberResponse = await fetch(TEMPNUMBER_API_URL);
        if (!tempNumberResponse.ok) throw new Error('Failed to fetch tempnumber data');
        const { result: tempNumbers } = await tempNumberResponse.json();

        let message = '┏━━ 🎉 *TEMP NUMBERS* 🎉 ━━◆\n';
        for (const { country, number, link } of tempNumbers) {
            message += `
┃ *Country:* ${country}
┃ *Number:* ${number}
┃ *Link:* [View SMS](${link})
┃
`;
        }
        message += '╰───────────────◆\n';

        // Fetch tempnumber code data (if necessary)
        const tempNumberCodeResponse = await fetch(TEMPNUMBER_CODE_API_URL);
        const tempNumberCodeData = await tempNumberCodeResponse.json();

        if (tempNumberCodeData.status && tempNumberCodeData.code) {
            message += `\n*Temp Number Code:* ${tempNumberCodeData.code}\n`;
        } else {
            message += '\n*No code available for the current temp number.*\n';
        }

        // Send the message
        await client.sendMessage(m.chat, { text: message }, { quoted: m });

    } catch (error) {
        console.error('Error:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching tempnumber data.' }, { quoted: m });
    }
};
