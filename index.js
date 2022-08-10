/*
const TelegramApi = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '5461271066:AAFm8pnYnf3JE4vBYT9iL6N0-jNCb2bYAsI'; // тут токен кторый мы получили от botFather

const bot = new TelegramApi( token, {polling: true});
*/

const { Telegraf, Markup } = require('telegraf')
require("dotenv").config()
const text = require("./const")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`Ку ку ${ctx.message.from.username}`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command( "course", async (ctx) => {

    try {
        await ctx.replyWithHTML("<b>Шось тут</b>", Markup.inlineKeyboard(
            [
                [Markup.button.callback("1", "btn_1"), Markup.button.callback("2", "btn_2")]
            ]
        ))
    } catch(e) {
        console.error(e)
    }   
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
