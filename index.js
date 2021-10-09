// Require the necessary discord.js classes
const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection,VoiceChannel, Intents } = require('discord.js');

const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

const { createDiscordJSAdapter } = require('./adapter.js');
globalThis.pomtime = 30;
globalThis.shortbreaktime = 5;
globalThis.longbreaktime = 10;
globalThis.intervalcount = 4;

globalThis.player = createAudioPlayer();
// Create a new client instance
globalThis.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
globalThis.client.commands = new Collection();
globalThis.connection;
globalThis.interval;
globalThis.state = 0;
globalThis.minutecount = 0;
globalThis.pomodorocount = 1;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	globalThis.client.commands.set(command.data.name, command);
}
// When the client is ready, run this code (only once)
globalThis.client.once('ready', async () => {
	await globalThis.playSong();
	console.log(`Ready! Logged in as ${client.user.tag}`);
});
globalThis.client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = globalThis.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
//client.on('messageCreate', message => {
//	console.log(message.content);
//});
//const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//for (const file of eventFiles) {
//	const event = require(`./events/${file}`);
//	if (event.once) {
//		client.once(event.name, (...args) => event.execute(...args));
//	} else {
//		client.on(event.name, (...args) => event.execute(...args));
//	}
//}

// Login to Discord with your client's token
globalThis.client.on('messageCreate', async (message) => {
	if (!message.guild) return;
	//console.log(message);
	if (message.content === '-join') {
		const channel = message.member?.voice.channel;

		if (channel) {
			try {
				const connection = await globalThis.connectToChannel(channel);
				//connection.subscribe(player);
				message.reply('Playing now!');
			} catch (error) {
				console.error(error);
			}
		} else {
			message.reply('Join a voice channel then try again!');
		}
	}
});



globalThis.client.login(token);

globalThis.playSong = function() {
	const resource = createAudioResource('137523190.mp3', {
		inputType: StreamType.Arbitrary,
	});

	globalThis.player.play(resource);

	return entersState(globalThis.player, AudioPlayerStatus.Playing, 5e3);
}




globalThis.connectToChannel = async function(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: globalThis.createDiscordJSAdapter(channel),
	});

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

globalThis.pomfunction= async function(){
	globalThis.minutecount = globalThis.minutecount + 1;
	switch(globalThis.state){
		case 0:
			if(globalThis.minutecount >= globalThis.pomtime && globalThis.pomodorocount >= globalThis.intervalcount){
				globalThis.minutecount = 0;
				globalThis.pomodorocount = 1;
				globalThis.state = 2;
				globalThis.channel = globalThis.client.channels.cache.get(globalThis.channelId);
        			globalThis.channel.send('time for a long break!');
				await globalThis.playSong();
			}
			else if(globalThis.minutecount >= globalThis.pomtime){
				globalThis.minutecount = 0;
                                globalThis.pomodorocount = globalThis.pomodorocount + 1;
                                globalThis.state = 1;
                                globalThis.channel = globalThis.client.channels.cache.get(globalThis.channelId);
                                globalThis.channel.send('time for a short break!');
                                await globalThis.playSong();
			}
			break;
		case 1:
			if(globalThis.minutecount >= globalThis.shortbreaktime){
                                globalThis.minutecount = 0;
                                globalThis.state = 0;
                                globalThis.channel = globalThis.client.channels.cache.get(globalThis.channelId);
                                globalThis.channel.send('short break over! Back to work!');
                                await globalThis.playSong();
                        }
			break;
		case 2:
			if(globalThis.minutecount >= globalThis.longbreaktime){
                                globalThis.minutecount = 0;
                                globalThis.state = 0;
                                globalThis.channel = globalThis.client.channels.cache.get(globalThis.channelId);
                                globalThis.channel.send('long break over! Back to work!');
                                await globalThis.playSong();
                        }
			break;
		default:
			console.log('bad state!');
			break;
	}
	console.log('minute incremented!' + globalThis.minutecount);
	//globalThis.channel = globalThis.client.channels.cache.get(globalThis.channelId);
	//globalThis.channel.send('content');
	//await globalThis.playSong();
}
