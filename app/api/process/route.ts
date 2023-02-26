import { NextApiRequest, NextApiResponse } from "next";
// import { ConfirmedSignatureInfo, Connection, PublicKey } from '@solana/web3.js';
// import { consoleLogDomainNames, extractDomainId, postClaimToDiscord } from "@/utils";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    console.log(request)
    const req = request.body;
    console.log(req)

    // if (!txn || (txn.meta && txn.meta.err != null)) {
    //   return response.status(200).json('done');;
    // }

    // // only new abc domains should be pushed to post in discord.
    // if (txn.meta.innerInstructions[0].instructions.length == 7) {
    //   const domainName = extractDomainId(txn.meta?.logMessages[2]);
    //   consoleLogDomainNames(domainName);
    //   postClaimToDiscord(domainName);
    // }

    response.status(200).json('done');
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}

