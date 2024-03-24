import { Event } from "../types/event";
import { client } from '../app';
import { CommandInteractionOptionResolver } from "discord.js";
export default new Event({
    name: "interactionCreate",
    execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        console.log(command);
        if (!command) return;
        const options = interaction.options as CommandInteractionOptionResolver;
        command.execute({
            client,
            interaction,
            options
        });
    }
})
