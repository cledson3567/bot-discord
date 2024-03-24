import { ExtendedClient } from './config/client';

const client: ExtendedClient = new ExtendedClient();
client.start();
client.on('interactionCreate', (interaction) => {
    console.log(interaction.user.avatarURL())
});
export { client };
