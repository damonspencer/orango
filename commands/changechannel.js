const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changechannel')
		.setDescription('Change the bot\'s channel'),
		//.addIntegerOption(option => option.setName('pomodoro').setDescription('Set pomodoro time (default 30 minutes)'))
		//.addIntegerOption(option => option.setName('shortbreak').setDescription('Set the short break time (default 5 minutes)'))
		//.addIntegerOption(option => option.setName('longbreak').setDescription('Set the long break time (default 10 minutes)'))
		//.addIntegerOption(option => option.setName('interval').setDescription('Set the pomodoro interval (default 4)')),
	async execute(interaction) {
		console.log('changing channel!');
		//console.log([globalThis.pomtime, globalThis.shortbreaktime, globalThis.longbreaktime, globalThis.intervalcount]);
		//if(interaction.options.getInteger('pomodoro') != null){
		//	globalThis.pomtime = interaction.options.getInteger('pomodoro');
		//}
		//else{
		//	globalThis.pomtime = 30;
		//}
                //if(interaction.options.getInteger('shortbreak') != null){
                //        globalThis.shortbreaktime = interaction.options.getInteger('shortbreak');
			//console.log('short break is not null!');
                //}
		//else{
			//console.log('short break is null!');
		//	globalThis.shortbreakime = 5;
		//}
		//if(interaction.options.getInteger('longbreak') != null){
                //        globalThis.longbreaktime = interaction.options.getInteger('longbreak');
                //}
		//else{
		//	globalThis.longbreaktime = 10;
		//}
		//if(interaction.options.getInteger('interval') != null){
                //        globalThis.intervalcount = interaction.options.getInteger('interval');
                //}
		//else{
		//	globalThis.intervalcount = 4;
		//}
		//console.log([globalThis.pomtime, globalThis.shortbreaktime, globalThis.longbreaktime, globalThis.intervalcount]);
		//console.log(interaction);
		//console.log(interaction.channelId);
		//const user = interaction;
		//const guild = globalThis.client.guilds.cache.get(interaction.guildId) // get the guild object
		//const member = interaction.member.guild.members.cache.get(interaction.user.id);
		//console.log(member);
		//console.log(guild);
		//console.log(member.guild.voiceStates);
		//console.log(interaction.guild.members[interaction.user.id]);
		//const list = globalThis.client.guilds.cache.get(interaction.guildId);
               	//list.members.cache.forEach(member => console.log(member));
		globalThis.channelId = interaction.channelId;
		//if (!message.guild) return;
        //console.log(message);
        //if (message.content === '-join') {
		//globalThis.interval = setInterval(globalThis.pomfunction, 60000);
		//console.log(globalThis.interval);
                //interaction.reply('🍊pomodoro set !👌');
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
                const channel = interaction.member?.voice.channel;

                if (channel) {
                        try {
				//globalThis.interval = setInterval(globalThis.pomfunction, 60000);
                		//console.log(globalThis.interval);
                		interaction.reply('🍊channel changed!👌');
                                globalThis.connection = await globalThis.connectToChannel(channel);
				globalThis.connection.subscribe(globalThis.player);
                                //connection.subscribe(player);
                                //interaction.reply('Playing now!');
                        } catch (error) {
                                console.error(error);
                        }
                } else {
                        interaction.reply('Join a voice channel then try again!');
                }
        //}
		//setInterval(globalThis.pomfunction, 60000);
		//return interaction.reply('🍊pomodoro set !👌');
		return;
	},
};
