import { ApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import { ExtendedClient } from "../config/client";


interface CommandsProps {
    client: ExtendedClient,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver,
};

export type CommandType = ApplicationCommandData & {
    execute(params: CommandsProps): any
};

export class BotCommand {
    constructor(options: CommandType) {
        options.dmPermission = false;
        Object.assign(this, options);
    };
};
