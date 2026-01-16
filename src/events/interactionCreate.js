const { Interaction, MessageFlags } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Handle slash commands
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(`Error in ${interaction.commandName}`, error);

                const errorMsg = {
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMsg).catch(console.error);
                } else {
                    await interaction.reply(errorMsg).catch(console.error);
                }
            }
        }

        // Handle button/modal interactions
        if (interaction.isButton() || interaction.isModalSubmit() || interaction.isStringSelectMenu()) {
            try {
                // Route based on customId to prevent conflicts
                const customId = interaction.customId;

                // YOUR INTERACTION
                if (customId === 'CUSTOMIDNAME') {
                    // Import handler from handlers folder
                    // Execute handler
                    return;
                }
                // Unknown interaction
                else {
                    console.warn(`Unknown interaction customId: ${customId}`);
                }
            } catch (error) {
                console.error('Error in handler:', error);

                const errorMsg = {
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMsg).catch(console.error);
                } else {
                    await interaction.reply(errorMsg).catch(console.error);
                }
            }
        }
    },
};