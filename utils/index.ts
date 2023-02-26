import { EmbedBuilder, WebhookClient } from 'discord.js';
import { webhookId, webhookToken } from '../config.json';
// import { ConfirmedSignatureInfo, Connection, PublicKey } from '@solana/web3.js';

export const consoleLogDomainNames = (domainNames: string) => {
  console.log("-------------------------------------------")
  console.log(`${domainNames}`,)
}

export function extractDomainId(str: string): string | null {
  const startIndex = str.indexOf('renewable domain ') + 'renewable domain '.length;
  const endIndex = str.indexOf('.abc');

  if (startIndex < 0 || endIndex < 0) {
    return null; // String does not match the expected format
  }

  return str.substring(startIndex, endIndex) + '.abc';
}

export function returnStringsAsLines(strings: string[]): string {
  return strings.join('\n')
}


export const postClaimToDiscord = (domainNames: string) => {
  const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });
  const embed = new EmbedBuilder()
    .setColor(0x00FFFF)
    .setDescription(`New domain claimed: 
  ${domainNames}`);
  webhookClient.send({
    content: 'Someone else just joined the .abc fam',
    username: '.abc Claimed',
    avatarURL: 'https://pbs.twimg.com/profile_images/1620509905487634438/z0q1w798_400x400.jpg', // this is the url to Jose's Twitter Bot
    embeds: [embed],
  });
}