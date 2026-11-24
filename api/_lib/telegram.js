// Telegram delivery. Uses HTML parse mode with every user-supplied value escaped,
// so characters like "_" or "*" in a contact (e.g. @ivan_petrenko) can no longer break the message.

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isConfigured() {
  return !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

async function sendMessage(html) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Telegram is not configured');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Telegram error ${res.status}: ${data.description || 'unknown'}`);
  }
}

function orderMessage(order) {
  return [
    '📦 <b>NEW REQUEST — MVP BUILD</b>',
    `🕒 ${escapeHtml(order.displayTime)}`,
    '━━━━━━━━━━━━━━━━━',
    '<b>PROJECT:</b>',
    escapeHtml(order.project),
    '',
    `<b>CONTACT:</b> ${escapeHtml(order.contact)}`,
    order.locale ? `<b>LANG:</b> ${escapeHtml(order.locale)}` : null,
    `<code>#${escapeHtml(order.id)}</code>`,
  ].filter((l) => l !== null).join('\n');
}

module.exports = { isConfigured, sendMessage, orderMessage, escapeHtml };
