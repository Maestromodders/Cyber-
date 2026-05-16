/*
 * ╔═══════════════════════════════════════════════╗
 * ║          CYBER-X WhatsApp Bot                 ║
 * ║         Configuration & Settings              ║
 * ╚═══════════════════════════════════════════════╝
 */

const session = process.env.SESSION || '';

const prefix = process.env.PREFIX || '.';
const mycode = process.env.CODE || '254';
const author = process.env.OWNER_NAME || 'CYBER-X Owner';
const packname = process.env.PACKNAME || 'CYBER-X';
const dev = process.env.OWNER_NUMBER || '254700000000';
const DevCyberX = dev.split(',');
const botname = process.env.BOTNAME || 'CYBER-X';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'true';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = 'session';
const presence = process.env.WA_PRESENCE || 'recording';
const herokuapikey = process.env.HEROKU_API_KEY || '';
const herokuAppname = process.env.HEROKU_APP_NAME || '';
const url = process.env.URL || 'https://i.imgur.com/iEWHnOH.jpeg';
const gurl = process.env.GURL || 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47';
const reactemoji = process.env.EMOJI || '⚡';
const antitag = process.env.ANTITAG || 'true';
const groupControl = process.env.GROUP_CONTROL || 'true';
const anticall = process.env.ANTICALL || 'true';
const antidelete = process.env.ANTIDELETE || 'true';
const antimention = process.env.ANTIMENTION || 'true';
const antibot = process.env.ANTIBOT || 'true';
const antilink = process.env.ANTILINK || 'true';
const antibad = process.env.ANTIBAD || 'true';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const chatbot = process.env.CHATBOT || 'false';
const greet = process.env.GREET || 'true';
const autodownloadstatus = process.env.AUTODOWNLOAD_STATUS || 'false';
const autostatusreply = process.env.AUTOREPLY_STATUS || 'true';
const autostatusmsg = process.env.AUTOSTATUS_MSG || '⚡ CYBER-X has viewed your status.';
const greetmsg = process.env.GREET_MSG || '⚡ My owner is currently unavailable. Text back later.';
const timezone = process.env.TIMEZONE || 'Africa/Nairobi';
const autoread = process.env.AUTOREAD || 'true';
const permit = process.env.PM_PERMIT || 'true';
const voicechatbot = process.env.VOICECHATBOT || 'false';
const voicechatbot2 = process.env.VOICECHATBOT2 || 'false';
const anticallmsg = process.env.ANTICALL_MSG || '⚡ CYBER-X declined your 🤙 call. Please send a message instead.';
const autobio = process.env.AUTOBIO || 'true';

// CYBER-X custom settings
const cyberTheme = process.env.CYBER_THEME || '⚡';
const cyberVersion = '1.0.0';

module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  autodownloadstatus,
  botname,
  voicechatbot,
  voicechatbot2,
  reactemoji,
  autobio,
  antilink: groupControl,
  antibad: groupControl,
  mode,
  prefix,
  anticall,
  autostatusreply,
  autostatusmsg,
  autolike,
  anticallmsg,
  mycode,
  chatbot,
  author,
  herokuAppname,
  herokuapikey,
  url,
  gurl,
  packname,
  dev,
  greet,
  greetmsg,
  DevCyberX,
  // Keep backward compat alias
  DevKeith: DevCyberX,
  gcpresence,
  permit,
  antionce,
  session,
  antitag,
  antidelete,
  antimention,
  antibot,
  cyberTheme,
  cyberVersion,
};
