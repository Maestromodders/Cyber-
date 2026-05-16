const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {
  const { client, m, packname, author, msgCYBER-X } = context;

  if (!msgCYBER-X) {
    m.reply('Quote an image or a short video.');
    return;
  }

  let media;
  if (msgCYBER-X.imageMessage) {
    media = msgCYBER-X.imageMessage;
  } else if (msgCYBER-X.videoMessage) {
    media = msgCYBER-X.videoMessage;
  } else {
    m.reply('That is neither an image nor a short video!');
    return;
  }

  var result = await client.downloadAndSaveMediaMessage(media);

  let stickerResult = new Sticker(result, {
    pack: packname,
    author: author,
    type: StickerTypes.FULL,
    categories: ["🤩", "🎉"],
    id: "12345",
    quality: 70,
    background: "transparent",
  });

  const Buffer = await stickerResult.toBuffer();
  client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });
};
