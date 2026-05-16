module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;

    try {
        if (!text) {
            return await sendReply(client, m, "❌ Please provide a GitHub username\nExample: *github CYBER-XcyberX*");
        }

        const apiUrl = `https://api.github.com/users/${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();

        // Handle null values in API response
        const nullSafe = (value) => value ?? 'Not specified';

        const userInfo = `💻 𝗚𝗜𝗧𝗛𝗨𝗕 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢

🌟 *Name:* ${nullSafe(data.name)}
🔖 *Username:* @${data.login}
📝 *Bio:* ${nullSafe(data.bio)}

🏢 *Company:* ${nullSafe(data.company)}
📍 *Location:* ${nullSafe(data.location)}
📧 *Email:* ${nullSafe(data.email)}
🌐 *Blog/Website:* ${nullSafe(data.blog)}

📦 *Public Repos:* ${data.public_repos}
👥 *Followers:* ${data.followers}
🤝 *Following:* ${data.following}

⏰ *Created:* ${new Date(data.created_at).toLocaleDateString()}
🔄 *Last Updated:* ${new Date(data.updated_at).toLocaleDateString()}`;

        await sendMediaMessage(client, m, {
            image: { url: data.avatar_url },
            caption: userInfo
        });

    } catch (error) {
        console.error('GitHub Module Error:', error);
        const errorMessage = error.message.includes('not found') 
            ? `🔍 GitHub user "${text}" not found\nCheck spelling and try again`
            : '⚠️ Error fetching GitHub profile. Please try again later.';
        await sendReply(client, m, errorMessage);
    }
};
