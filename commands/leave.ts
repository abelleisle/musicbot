import { Message, SlashCommandBuilder } from "discord.js";
import { bot } from "../index";
import { i18n } from "../utils/i18n";
import { canModifyQueue } from "../utils/queue";

export default {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription(i18n.__("leave.description")),
    execute(message: Message) {
        const queue = bot.queues.get(message.guild!.id);

        if (!queue) return message.reply(i18n.__("leave.errorNotQueue")).catch(console.error);
        if (!canModifyQueue(message.member!)) return i18n.__("common.errorNotChannel");

        queue.stop();

        queue.textChannel.send(i18n.__mf("leave.result", { author: message.author })).catch(console.error);

        queue.connection.destroy();
    }
};
