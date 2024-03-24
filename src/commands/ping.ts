import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { BotCommand } from "../types/commands";

export default new BotCommand({
    name: 'ping',
    description: 'aidento',
    type: ApplicationCommandType.ChatInput,
    execute({ interaction }) {
        interaction.reply({ content: 'aidento'})
    }
});
