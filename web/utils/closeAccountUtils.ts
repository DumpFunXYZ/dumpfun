import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"

// Connect to the Solana cluster
const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/Q19FeX_OTRO0E9xhDAr5rr5vMwCgakyt', "confirmed");

// Function to fetch unclosed accounts
export const getUnclosedAccounts = async (publicKeyString:string) => {
  try {
    const publicKey = new PublicKey(publicKeyString);

    // Fetch all accounts owned by the given public key
    const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), // SPL Token Program
    });

    const unclosedAccounts = accounts.value.filter((account) => {
      const accountInfo = account.account.data.parsed.info;
      const balance = parseFloat(accountInfo.tokenAmount.uiAmountString);
      return balance === 0; // Filter accounts with a zero token balance
    });

    console.log("Unclosed Accounts with Zero Balance:");
    unclosedAccounts.forEach((account, index) => {
      console.log(`${index + 1}: ${account.pubkey.toBase58()}`);
    });

    return unclosedAccounts;
  } catch (error) {
    console.error("Error fetching accounts:", error);
  }
};



