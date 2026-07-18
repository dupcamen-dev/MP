module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { project, contact, displayTime } = req.body;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram not configured on server' });
  }

  const msg = [
    `📦 *NEW REQUEST — MVP BUILD*`,
    `🕒 ${displayTime || new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`,
    `━━━━━━━━━━━━━━━━━`,
    `*PROJECT:*`,
    project || '(not specified)',
    ``,
    `*CONTACT:* ${contact}`,
  ].join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ error: `Telegram error: ${errText}` });
    }

    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
