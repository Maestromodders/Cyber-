const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = async (context) => {
  const { client, m, pushname, msgCYBER-X } = context;

  if (!msgCYBER-X) {
    m.reply('Quote an image, a short video or a sticker to change watermark.');
    return;
  }

  let media;
  if (msgCYBER-X.imageMessage) {
    media = msgCYBER-X.imageMessage;
  } else if (msgCYBER-X.videoMessage) {
    media = msgCYBER-X.videoMessage;
  } else if (msgCYBER-X.stickerMessage) {
    media = msgCYBER-X.stickerMessage;
  } else {
    m.reply('This is neither a sticker, image nor a video...');
    return;
  }

  var result = await client.downloadAndSaveMediaMessage(media);

  let stickerResult = new Sticker(result, {
    pack: pushname,
    author: pushname,
    type: StickerTypes.FULL,
    categories: ["🤩", "🎉"],
    id: "12345",
    quality: 70,
    background: "transparent",
  });

  const Buffer = await stickerResult.toBuffer();
  client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });
};
