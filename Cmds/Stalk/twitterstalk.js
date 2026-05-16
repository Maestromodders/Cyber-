module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a Twitter username to stalk');
        
        const fetch = require("node-fetch");
        const username = text.trim().replace('@', ''); // Remove @ if included
        
        const response = await fetch(`https://apis-CYBER-X.vercel.app/stalker/twitter?user=${username}`);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch Twitter profile. Maybe the user doesn't exist?");
        }
        
        const profile = data.result.profile;
        const stats = data.result.stats;
        
        // Format the profile information
        const summary = `
🐦 *Twitter Profile Info* 🐦

👤 *Username:* @${profile.username}
📛 *Display Name:* ${profile.displayName}
📝 *Bio:* ${profile.description || 'No bio'}
📍 *Location:* ${profile.location || 'Not specified'}
✅ *Verified:* ${profile.verified ? 'Yes' : 'No'}
📅 *Joined:* ${new Date(profile.createdAt).toLocaleDateString()}

📊 *Stats:*
💬 *Tweets:* ${stats.tweets.toLocaleString()}
👥 *Following:* ${stats.following.toLocaleString()}
🫂 *Followers:* ${stats.followers.toLocaleString()}
❤️ *Likes:* ${stats.likes.toLocaleString()}
🖼️ *Media:* ${stats.media.toLocaleString()}
`.trim();
        
        // Send profile picture with the summary as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: { url: profile.images.avatar.replace('_normal', '') }, // Get higher resolution image
                caption: summary 
            }
        );
        
    } catch (error) {
        console.error('Twitter stalk error:', error);
        m.reply("An error occurred while fetching Twitter profile.");
    }
}
