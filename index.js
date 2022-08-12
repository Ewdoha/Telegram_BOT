
const { Telegraf, Markup } = require('telegraf')
require("dotenv").config()
const text = require("./const")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`Ку ку ${ctx.message.from.username}`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command( "course", async (ctx) => {
    try {
        await ctx.replyWithHTML("<b>Вибери щось</b>", Markup.inlineKeyboard(
            [
                [Markup.button.callback("1", "btn_1"), Markup.button.callback("2", "btn_2")],
                [Markup.button.callback("3", "btn_3")]
            ]
        ))
    } catch(e) {
        console.error(e)
    }   
})

function addActionBot(nameButton, src, text) {
    bot.action(nameButton, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
              await ctx.replyWithPhoto({
                source: src
              })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true 
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addActionBot("btn_1", "./img/1.jpg", text.text1);
addActionBot("btn_2", "./img/2.jpg", text.text2);
addActionBot("btn_3", false, text.text3);

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
