import { BitFieldResolvable, Client, Collection, GatewayIntentsString, IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
import { CommandType } from '../types/commands';
config();

export class ExtendedClient extends Client {
    public commands: Collection<string, CommandType> = new Collection();
    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
        })
    };

    public start(): void {
       try {
        this.login(process.env.BOT_TOKEN);
        console.log('BOT online');
       } catch (error) {
        console.error('Novo erro: ' + error);
       };
    }
};
