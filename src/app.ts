import { EmbedBuilder, WebhookClient } from 'discord.js';
import { webhookId, webhookToken } from './config.json';

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

//each domain has to be on it's separate line
/*
let domains =`bla.abc
blabla.abc
*/

let domains = ``

const embed = new EmbedBuilder()
	.setColor(0x00FFFF)
    .setDescription(`New domain(s) claimed: 
${domains}`);

webhookClient.send({
	content: 'Someone else just joined the .abc fam',
	username: '.abc Claimed',
	avatarURL: 'https://pbs.twimg.com/profile_images/1620509905487634438/z0q1w798_400x400.jpg', //this is the url to Jose's Twitter Bot
	embeds: [embed],
});