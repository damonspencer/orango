const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bye')
		.setDescription('Stop the timer and leave'),
	async execute(interaction) {
		clearInterval(globalThis.interval);
		globalThis.connection.destroy();
		globalThis.state = 0;
		globalThis.minutecount = 0;
		globalThis.pomodorocount = 1;
		return interaction.reply('Bye!');
	},
};
