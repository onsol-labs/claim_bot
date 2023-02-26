import { consoleLogDomainNames, extractDomainId, postClaimToDiscord } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const req = request.body;
    console.log(req)

    if (!req[0] || (req[0].meta && req[0].meta.err != null)) {
      return response.status(200).json('done');;
    }


    // only new abc domains should be pushed to post in discord.
    if (req[0].meta.innerInstructions[0].instructions.length == 7) {
      const domainName = extractDomainId(req[0].meta?.logMessages[2]);
      if (domainName) {
        // consoleLogDomainNames(domainName);
        postClaimToDiscord(domainName);
      }
    }

    response.status(200).json('done');
  } catch (e) {
    console.error(e);
    response.status(500).json(e);
  }
}
