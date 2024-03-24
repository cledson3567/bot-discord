import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    EmbedBuilder,
} from 'discord.js';
import { BotCommand } from '../types/commands';

export default new BotCommand({
    name: 'icon',
    description: 'Coleta o icone do usuario X',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuario',
            description: 'Usuario para coletar o icone',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    async execute({ interaction, options }) {
        const user = options.getUser('usuario');
        if (user) {
            const avatarURL = user.avatarURL({ forceStatic: false, extension: 'png', size: 2048 });
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Avatar de ${user.username}`)
                .setImage(avatarURL)
            
            await interaction.reply({ embeds: [embed]})
        } else {
            const avatarURL = interaction.user.avatarURL({ forceStatic: false, extension: 'png', size: 2048});
            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`Avatar de ${interaction.user.username}`)
                .setImage(avatarURL)
            await interaction.reply({ embeds: [embed]});
        };
    },
});
