const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the timer'),
	async execute(interaction) {
		console.log(globalThis.interval);
		clearInterval(globalThis.interval);
		console.log(globalThis.interval);
		//globalThis.connection.destroy();
		//globalThis.state = 0;
		//globalThis.minutecount = 0;
		//globalThis.pomodorocount = 1;
		//console.log(globalThis.interval);
		return interaction.reply('Paused!');
	},
};
