module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide an IP address to lookup');
        
        const fetch = require("node-fetch");
        const ip = text.trim();
        
        // Basic IP validation
        if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
            return m.reply('Please provide a valid IPv4 address');
        }
        
        const apiUrl = `https://apis-CYBER-X.vercel.app/stalker/ip?q=${ip}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch IP information. Please try again later.");
        }
        
        const meta = data.result.metadata;
        const loc = data.result.location;
        const net = data.result.network;
        
        // Format coordinates
        const formatCoords = (lat, lon) => {
            const latDir = lat >= 0 ? 'N' : 'S';
            const lonDir = lon >= 0 ? 'E' : 'W';
            return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lon).toFixed(4)}°${lonDir}`;
        };
        
        // Format network information
        const networkType = [
            net.isMobile ? '📱 Mobile' : '',
            net.isProxy ? '🔄 Proxy' : '',
            net.isHosting ? '🖥️ Hosting' : ''
        ].filter(Boolean).join(' | ') || '🖧 Standard';
        
        // Format timestamp
        const formatTime = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        };
        
        // Build the summary
        const summary = `
🌐 *IP Address Information* 🌐
🔍 *IP:* ${meta.ip}

🗓️ *Metadata:*
• *Cache Status:* ${meta.cached ? 'Cached' : 'Live'}
• *Cache Time:* ${formatTime(meta.cacheTimestamp)}
• *Last Updated:* ${formatTime(meta.lastUpdated)}

📍 *Location:*
• *Continent:* ${loc.continent}
• *Country:* ${loc.country} (${loc.countryCode})
• *Region:* ${loc.region}
• *City:* ${loc.city}
• *ZIP Code:* ${loc.zipCode}
• *Coordinates:* ${formatCoords(loc.coordinates.latitude, loc.coordinates.longitude)}
• *Timezone:* ${loc.timezone}
• *Currency:* ${loc.currency}

📶 *Network:*
• *ISP:* ${net.isp}
• *Organization:* ${net.organization}
• *AS Number:* ${net.as}
• *Reverse DNS:* ${net.reverseDNS || 'N/A'}
• *Network Type:* ${networkType}
`.trim();
        
        // Send Google Maps link separately
        const mapsUrl = `https://www.google.com/maps?q=${loc.coordinates.latitude},${loc.coordinates.longitude}`;
        
        await client.sendMessage(
            m.chat, 
            { 
                text: summary 
            }
        );
        
        await client.sendMessage(
            m.chat,
            {
                text: `🗺️ *Location Map:* ${mapsUrl}`
            }
        );
        
    } catch (error) {
        console.error('IP stalk error:', error);
        m.reply("An error occurred while fetching IP information.");
    }
}
