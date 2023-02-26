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
    .setDescription(`New domain(s) claimed: 
  ${domainNames}`);
  webhookClient.send({
    content: 'Someone else just joined the .abc fam',
    username: '.abc Claimed',
    avatarURL: 'https://pbs.twimg.com/profile_images/1620509905487634438/z0q1w798_400x400.jpg', // this is the url to Jose's Twitter Bot
    embeds: [embed],
  });
}

// async function main(): Promise<void> {
//   const connection = new Connection(RpcUrl, 'confirmed');

//   let signatures: ConfirmedSignatureInfo[];
//   let lastKnownSignature = "2p9JvZBXCFfpCjh3934FEZWBrYb2gfmmFqVVBXZTsQNxd1NkQAuTvEtT6ehVvZvVfUTL1v28mQGVKUDfLYbgbJia";
//   let until = lastKnownSignature;

//   while (true) {
//     await timer(1000);

//     try {
//       const TLD_HOUSE_PROGRAM_ID = new PublicKey("TLDHkysf5pCnKsVA4gXpNvmy7psXLPEu4LAdDJthT9S");

//       // Listen for new transactions
//       signatures = await connection.getSignaturesForAddress(TLD_HOUSE_PROGRAM_ID, { until });

//       if (signatures.length === 0) {
//         console.log("polling...");
//         await timer(9000);
//         continue;
//       }

//       const domains: string[] = [];
//       for (const { signature } of signatures) {
//         try {
//           if (!signature) {
//             continue;
//           }

//           const txn = await connection.getTransaction(signature, { maxSupportedTransactionVersion: 0 });

//           if (!txn || (txn.meta && txn.meta.err != null)) {
//             continue;
//           }

//           // only new abc domains should be pushed to post in discord.
//           if (txn.meta.innerInstructions[0].instructions.length == 7) {
//             const domainName = extractDomainId(txn.meta?.logMessages[2]);
//             if (domainName) {
//               domains.push(domainName);
//             }
//           }
//         } catch (err) {
//           console.log(`error while going through signatures: ${err}`);
//           continue;
//         }
//       }

//       const domainNames = returnStringsAsLines(domains);
//       // consoleLogDomainNames(domainNames);
//       postClaimToDiscord(domainNames);

//       lastKnownSignature = signatures[0].signature;
//       if (lastKnownSignature) {
//         until = lastKnownSignature;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// main();
