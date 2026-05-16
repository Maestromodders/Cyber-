module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide an NPM package name to lookup');
        
        const fetch = require("node-fetch");
        const packageName = text.trim();
        
        const apiUrl = `https://apis-CYBER-X.vercel.app/stalker/npm?q=${encodeURIComponent(packageName)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch NPM package. Please check the package name and try again.");
        }
        
        const meta = data.result.metadata;
        const pkg = data.result.packageInfo;
        const stats = data.result.stats;
        
        // Format keywords if they exist
        const keywords = pkg.keywords && pkg.keywords.length > 0 
            ? pkg.keywords.map(k => `#${k}`).join(' ') 
            : 'No keywords';
        
        // Format collaborators if they exist
        const collaborators = pkg.collaborators && pkg.collaborators.length > 0
            ? pkg.collaborators.join(', ')
            : 'No collaborators listed';
        
        // Build the summary
        const summary = `
📦 *NPM Package Information* 📦
🔍 *Package:* ${meta.package}

ℹ️ *Basic Info:*
• *Version:* ${pkg.version || 'Not specified'}
• *License:* ${pkg.license || 'Not specified'}
• *Published:* ${pkg.published.relative || 'Unknown'}
• *Last Updated:* ${new Date(meta.lastUpdated).toLocaleDateString()}

📝 *Description:*
${pkg.description || 'No description available'}

🏷️ *Keywords:*
${keywords}

📊 *Stats:*
• *Weekly Downloads:* ${stats.weeklyDownloads.toLocaleString()}
• *Dependents:* ${stats.weeklyDependents.toLocaleString()}

👥 *Collaborators:*
${collaborators}

🔧 *Installation:*
${pkg.commands.installation || 'npm install ' + meta.package}
`.trim();
        
        await client.sendMessage(
            m.chat, 
            { 
                text: summary 
            }
        );
        
    } catch (error) {
        console.error('NPM stalk error:', error);
        m.reply("An error occurred while fetching NPM package information.");
    }
}
