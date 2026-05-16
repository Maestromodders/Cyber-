module.exports = async (context) => {
    const { client, m, text, sendReply, sendMediaMessage } = context;
    
    try {
        // Validate input
        if (!text) return sendReply(client, m, '🎵 Please provide a song title to search');
        
        const fetch = require("node-fetch");
        const query = text.trim();
        
        // Fetch lyrics with timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const apiUrl = `https://apis-CYBER-X.vercel.app/search/lyrics?query=${encodeURIComponent(query)}`;
        
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        
        const data = await response.json();
        
        // Validate response
        if (!data?.status || !Array.isArray(data.result)) {
            return sendReply(client, m, "❌ Invalid response from lyrics API");
        }

        if (data.result.length === 0) {
            return sendReply(client, m, `🔎 No lyrics found for "${query}"`);
        }

        // Helper functions
        const formatDuration = (seconds) => {
            if (!seconds) return 'N/A';
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Build combined results message
        let message = `🎶 *Lyrics Search Results for "${query}"*\n`;
        message += `📌 Found ${data.result.length} matches\n\n`;
        
        // Show top 3 results with preview
        data.result.slice(0, 3).forEach((song, index) => {
            const previewLines = song.lyrics.split('\n').slice(0, 4).join('\n');
            
            message += `▫️ *${index + 1}. ${song.song}* - ${song.artist}\n`;
            message += `   💿 ${song.album || 'Single'}\n`;
            message += `   ⏱ ${formatDuration(song.duration)}\n`;
            message += `   📜 ${previewLines}...\n\n`;
        });

        // Add full lyrics of first result
        if (data.result[0].lyrics) {
            message += `🎤 *Full Lyrics for "${data.result[0].song}":*\n\n`;
            message += `${data.result[0].lyrics}\n\n`;
        }

        if (data.result.length > 3) {
            message += `ℹ️ Showing 3 of ${data.result.length} results`;
        }

        // Send as single message
        await sendMediaMessage(client, m, {
            text: message.trim()
        }, { quoted: m });

    } catch (error) {
        console.error('Lyrics search error:', error);
        const errorMsg = error.name === 'AbortError' 
            ? '⌛ Search timed out (10s)' 
            : '⚠️ Failed to search lyrics. Please try again later.';
        sendReply(client, m, errorMsg);
    }
};
