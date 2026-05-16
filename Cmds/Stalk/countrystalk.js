module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a country name to search');
        
        const fetch = require("node-fetch");
        const countryName = text.trim();
        
        const apiUrl = `https://apis-CYBER-X.vercel.app/stalker/country?region=${encodeURIComponent(countryName)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Country not found. Please check your spelling and try again.");
        }
        
        const meta = data.result.metadata;
        const basic = data.result.basicInfo;
        const geo = data.result.geography;
        const culture = data.result.culture;
        const gov = data.result.government;
        const iso = data.result.isoCodes;
        
        // Format coordinates
        const formatCoords = (coords) => {
            const lat = coords.latitude >= 0 ? 
                `${coords.latitude}°N` : `${Math.abs(coords.latitude)}°S`;
            const lon = coords.longitude >= 0 ? 
                `${coords.longitude}°E` : `${Math.abs(coords.longitude)}°W`;
            return `${lat}, ${lon}`;
        };
        
        // Format neighbor countries
        const neighbors = geo.neighbors.map(n => 
            `• ${n.name} (${formatCoords(n.coordinates)})`
        ).join('\n');
        
        // Format languages
        const languages = culture.languages.native.map((lang, i) => 
            `${lang} (${culture.languages.codes[i]})`
        ).join(', ');
        
        // Build the summary
        const summary = `
🌍 *Country Information* 🌍
*Match Confidence:* ${meta.matchConfidence * 100}%

🏛️ *Basic Info:*
• *Name:* ${basic.name}
• *Capital:* ${basic.capital}
• *Phone Code:* ${basic.phoneCode}
• *Internet TLD:* ${basic.internetTLD}
• *Google Maps:* ${basic.googleMaps}

🗺️ *Geography:*
• *Continent:* ${geo.continent.emoji} ${geo.continent.name}
• *Coordinates:* ${formatCoords(geo.coordinates)}
• *Area:* ${geo.area.sqKm.toLocaleString()} km² (${geo.area.sqMiles.toLocaleString()} mi²)
• *Landlocked:* ${geo.landlocked ? 'Yes' : 'No'}
• *Bordering Countries (${geo.neighbors.length}):*\n${neighbors}

🎭 *Culture:*
• *Languages:* ${languages}
• *Famous For:* ${culture.famousFor}
• *Driving Side:* ${culture.drivingSide}
• *Alcohol Policy:* ${culture.alcoholPolicy || 'Not specified'}

🏦 *Government:*
• *Constitutional Form:* ${gov.constitutionalForm}
• *Currency:* ${gov.currency}

📝 *ISO Codes:*
• *Numeric:* ${iso.numeric}
• *Alpha-2:* ${iso.alpha2}
• *Alpha-3:* ${iso.alpha3}
`.trim();
        
        // Send country flag with the summary as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: { url: basic.flag },
                caption: summary 
            }
        );
        
    } catch (error) {
        console.error('Country info error:', error);
        m.reply("An error occurred while fetching country information.");
    }
}
