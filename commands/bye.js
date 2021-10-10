const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bye')
		.setDescription('Stop the timer and leave'),
	async execute(interaction) {
		//console.log(globalThis.interval);
		//clearInterval(globalThis.interval);
		//console.log(globalThis.interval);
		//globalThis.connection.destroy();
		try{
                        console.log('connection:');
                        console.log(globalThis.connection);
                        globalThis.connection.destroy();
                        console.log(globalThis.connection);
                } catch(error){
                        console.log('connection NOT destroyed! No previous connection?');
                        console.log(globalThis.connection);
                        //globalThis.connection.destroy();
                        //console.log(globalThis.connection);
                }
                try{
                        console.log('interval');
                        console.log(globalThis.interval);
                        clearInterval(globalThis.interval);
                        console.log(globalThis.interval);
                } catch(error){
                        console.log('interval NOT cleared! No previous interval?');
                        console.log(globalThis.interval);
                }
		globalThis.state = 0;
		globalThis.minutecount = 0;
		globalThis.pomodorocount = 1;
		console.log(globalThis.interval);
		return interaction.reply('Bye!');
	},
};
