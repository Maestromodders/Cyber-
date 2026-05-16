/*
 * ╔═══════════════════════════════════════════════╗
 * ║          CYBER-X WhatsApp Bot                 ║
 * ║         Configuration & Settings              ║
 * ╚═══════════════════════════════════════════════╝
 */

const session = process.env.SESSION || 'KnightBot!H4sIAAAAAAAAA5VUXZOiOBT9L3nVmgZUUKu6amlQ/EQRP8CteQgQIBI+TAKIU/73KezpmXnYne19CyF17rnnnHu/gSzHDC1RA8bfQEFxBTlqj7wpEBiDtzIMEQVdEEAOwRiUc+ovbjd9wfPTttzE9oiph0l8MQ67OFrycO+ITnkrJP80fwWPLihKj2D/D4DrF9tduldc7pnVCxq50/QxmiFlWuzc6uQdhKRJ4eAqOdh6BY8WEWKKs2hSxChFFJIlarYQ08/Rn6yN8+XFrNS7j8JUpmvpVrsOJeu+b51FyU7FIY83yUY4CJ+jXzpXifiesVexKG6Pts+13TaawS1Zn04E5961yXWHzZTd8J0+w1GGgnmAMo5582ndc2M4TZlMRtMgSfQYJxm/Xp1R52BLHfKiC3E0o0Z0ORLh8Dnib0dhONJJKnX0ReWL28ul1zjGKNd03ZoqxnR5i+/CVL/EE+t34lv6kZXk/+ieT4f3m+Nrrpps1pAI+VQ/XNBgOb3It4nIEnchNYujoWHjk7GJ7/fadnNls5sdS2PpapbReMHwRc+tEJpKMGGHmq2GqTGZ/KIPeUn/xJJzd+rv/PC08N5Ifkr6mtOxC1x4Kyfx31Z3wWy8tJZGbuhFtZoyQpZGIphz1zg7I2EvknqD1rwfY4zssgzCq6pQtX59dpSgZh6AsfjoAooizDiFHOdZe9frAhhUNvIp4k9xwTKYDYomjm8ZMo6TKVGvJd3WZ1M6mmfJNHQ91vyXqLmvjPoVdEFBcx8xhoIZZjynzRoxBiPEwPjvr12QoRt/t+1ZTOyCEFPGD1lZkBwGH55+/IS+n5cZt5vM19oDomAs/LpGnOMsYq2KZQapH+MKaTHkDIxDSBj62R+iKABjTkv0c2a1PGhl3/UHjm3OLNAF6dMOHIAxkAZ9UehJstCXhbEk/8W+1C0sLIovGeKgC8jzWU9QRGXUF+VBT5Z67cP2/vGTYIsXIA4xYWAMtI3Xj+vEGiqX/b12XdVW1aWqtqJ9NPSRi3fle7vzfGMqVfribE6H0bUj7S/zRnZX+3ze31vldietijUhjOT/BNKGykyrwFws1G2mLAMsYX0S3FZJNarLRWLcFUVRWHCzfdvSIn6I9pZKJ7O6ULNsIDkenAy1E10Mwr4qW+Z1NSK9RLrr1mtbLUAV9tHvxRadjnVXtYjIHc2r30SyDU3WY/dgp3q7gVndmGGEehn3hpM95voMCTNpCS+eOfM6m+bSGa5Ec0NuL1ezqm3qmrujIr9Z74l9Tgz5sanwM02tVe1niNFz8DPYGvjf1r0TbxMmPLq/YfxYJf+2ogLhZOsXpAwq8U7IFlY86TfrMtUEWdtMhNVFCLC8X5y9BQSPx9cuKAjkYU5TMAYwC2iOA9AFNC/byM6zMP9DMU1N5roV2W3nBDKu/hqDPU4R4zAtwFhUFEUe9EfC8PEdwclK2DoHAAA=';

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
