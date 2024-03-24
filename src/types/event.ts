import { ClientEvents } from 'discord.js';

export type BotEvents<Key extends keyof ClientEvents> = {
    name: Key;
    once?: boolean,
    execute(...params: ClientEvents[Key]): any;
};

export class Event<Key extends keyof ClientEvents> {
    constructor(options: BotEvents<Key>) {
        Object.assign(this, options);
    };
};
