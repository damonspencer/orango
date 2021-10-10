const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the timer'),
	async execute(interaction) {
		console.log('resuming!');
		try{
                        console.log('interval (clear)');
                        console.log(globalThis.interval);
                        clearInterval(globalThis.interval);
                        console.log(globalThis.interval);
                } catch(error){
                        console.log('interval NOT cleared! No previous interval?');
                        console.log(globalThis.interval);
                }
		try{
                        console.log('interval (set)');
                        console.log(globalThis.interval);
                        globalThis.interval = setInterval(globalThis.pomfunction, 60000);
                        console.log(globalThis.interval);
                } catch(error){
                        console.log('interval NOT set!');
                        console.log(globalThis.interval);
                }
		//globalThis.connection.destroy();
		//globalThis.state = 0;
		//globalThis.minutecount = 0;
		//globalThis.pomodorocount = 1;
		//console.log(globalThis.interval);
		return interaction.reply('Resumed!');
	},
};
