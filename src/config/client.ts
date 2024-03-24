import {
    ApplicationCommandDataResolvable,
    BitFieldResolvable,
    Client,
    ClientEvents,
    Collection,
    GatewayIntentBits,
    GatewayIntentsString,
    IntentsBitField
} from 'discord.js';
import { config } from 'dotenv';
import { CommandType } from '../types/commands';
import path from 'node:path';
import fs from 'node:fs';
import { BotEvents } from '../types/event';
config();

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>
        });
    }

    private registerCommands(
        commands: Array<ApplicationCommandDataResolvable>,
    ): void {
        try {
            this.application?.commands.set(commands);
            console.log('Comandos registrados com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar os comandos no bot: ' + error);
        }
    }

    private registerModules(): void {
        const slashCommands: Array<ApplicationCommandDataResolvable> =
            new Array();
        const commandsPath = path.join(__dirname, '..', 'commands');
        const filtredFiles = (filename: string) =>
            filename.endsWith('.ts') || filename.endsWith('.js');

        fs.readdirSync(commandsPath).forEach(async (filename) => {
            const command: CommandType = (
                await import(`../commands/${filename}`)
            )?.default;
            const { name } = command;
            if (name) {
                this.commands.set(name, command);
                slashCommands.push(command);
            };
        });

        this.on('ready', () => this.registerCommands(slashCommands));
    }

    private registerEvents(): void {
        const eventsPath = path.join(__dirname, '..', 'events');
        fs.readdirSync(eventsPath).forEach(async (filename) => {
            console.log(filename);
            const eventPromise = await import(`../events/${filename}`);
            const events = await eventPromise?.default;
            try {
                console.log(events.name, events.once, events.execute);
                if (events.name) (events.once) ? this.once(events.name, events.execute) : this.on(events.name, events.execute);
                console.log('Eventos registrados!');
            } catch (error) {
                console.error('Novo error em client.ts' + error);
            };
        });
    };

    public start(): void {
        try {
            this.registerEvents();
            this.registerModules();
            this.login(process.env.BOT_TOKEN);
            console.log('BOT online');
        } catch (error) {
            console.error('Novo erro: ' + error);
        }
    }
}
