const Telegraf = require('telegraf')

const Markup = Telegraf.Markup

const bot = new Telegraf.Composer()
module.exports = bot

bot.command(['start', 'url'], ctx => {
  let text = `Hey ${ctx.from.first_name}!`
  text += '\n\nMit /add kannst du Veranstaltungen zu deinem Kalender hinzufügen.'

  const keyboardKeys = []
  if (ctx.state.userconfig.events.length > 0) {
    text += '\nMit /remove kannst du Veranstaltungen entfernen.'
    text += '\nMit /list kannst du die Liste deiner Veranstaltungen einsehen.'

    const url = `calendarbot.hawhh.de/tg/${ctx.chat.id}.ics`
    keyboardKeys.push(Markup.urlButton('Kalender abonnieren', `https://calendarbot.hawhh.de/ics.php?url=${url}`))
    keyboardKeys.push(Markup.urlButton('Kalender URL', `https://${url}`))
  }
  text += '\nUnter /settings gibt es genauere Einstellungen zu deinem Kalender oder diesem Bot.'

  ctx.reply(text, Markup.inlineKeyboard(keyboardKeys, {
    columns: 1
  }).extra())
})
