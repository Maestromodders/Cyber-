module.exports = async (context) => {
    const { client, m, text } = context;
    
    try {
        if (!text) return m.reply('Please provide a GitHub repository URL');
        
        const fetch = require("node-fetch");
        let repoUrl = text.trim();
        
        // Validate GitHub URL
        if (!repoUrl.includes('github.com')) {
            return m.reply('Please provide a valid GitHub repository URL');
        }
        
        // Clean URL if it has .git or trailing slash
        repoUrl = repoUrl.replace('.git', '').replace(/\/$/, '');
        
        const apiUrl = `https://apis-CYBER-X.vercel.app/stalker/repostalk?url=${encodeURIComponent(repoUrl)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (!data.status) {
            return m.reply("Failed to fetch repository. Please check the URL and try again.");
        }
        
        const repo = data.result.repo;
        const owner = data.result.owner;
        const features = data.result.features;
        
        // Format size from KB to MB
        const sizeInMB = (repo.size / 1024).toFixed(2);
        
        // Format dates
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };
        
        // Build features list
        const featureList = [
            features.hasIssues ? '• Issues: ✅' : '• Issues: ❌',
            features.hasProjects ? '• Projects: ✅' : '• Projects: ❌',
            features.hasWiki ? '• Wiki: ✅' : '• Wiki: ❌',
            features.hasPages ? '• Pages: ✅' : '• Pages: ❌',
            features.hasDownloads ? '• Downloads: ✅' : '• Downloads: ❌',
            features.isTemplate ? '• Template: ✅' : '• Template: ❌',
            features.allowForking ? '• Forking: ✅' : '• Forking: ❌'
        ].join('\n');
        
        // Format the repository information
        const summary = `
🛠️ *GitHub Repository Info* 🛠️

📂 *Repository:* ${repo.fullName}
📝 *Description:* ${repo.description || 'No description'}
🌐 *URL:* ${repo.url}

📊 *Stats:*
⭐ *Stars:* ${repo.stars.toLocaleString()}
👀 *Watchers:* ${repo.watchers.toLocaleString()}
🍴 *Forks:* ${repo.forks.toLocaleString()}
🚩 *Issues:* ${repo.openIssues.toLocaleString()}
📦 *Size:* ${sizeInMB} MB
💻 *Language:* ${repo.language || 'Not specified'}
📜 *License:* ${repo.license?.name || 'None'}
🌿 *Default Branch:* ${repo.defaultBranch}
👁️ *Visibility:* ${repo.visibility}

📅 *Dates:*
🆕 *Created:* ${formatDate(repo.createdAt)}
🔄 *Updated:* ${formatDate(repo.updatedAt)}
⏩ *Pushed:* ${formatDate(repo.pushedAt)}

👤 *Owner:*
🔹 *Username:* ${owner.username}
🔹 *Profile:* ${owner.profileUrl}
🔹 *Type:* ${owner.type}

🔧 *Features:*
${featureList}

🔗 *Clone URLs:*
• HTTPS: \`${repo.cloneUrls.https}\`
• SSH: \`${repo.cloneUrls.ssh}\`
• Git: \`${repo.cloneUrls.git}\`
`.trim();
        
        // Send owner avatar with the summary as caption
        await client.sendMessage(
            m.chat, 
            { 
                image: { url: owner.avatar },
                caption: summary 
            }
        );
        
    } catch (error) {
        console.error('GitHub repo stalk error:', error);
        m.reply("An error occurred while fetching repository information.");
    }
}
