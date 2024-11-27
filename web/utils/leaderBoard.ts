import { firestore } from './firebase'; // Import Firestore from your Firebase setup
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, getDocs, query, orderBy, limit, increment } from 'firebase/firestore';

// Constants
const POINTS_PER_TRADE = 100; // Define the reward rate: $10 trade gives 100 points

/**
 * Add a trade and update the user's total points.
 * 
 * @param {string} walletAddress - The user's wallet address (unique identifier).
 * @param {number} tradeAmount - The amount of the trade in dollars.
 * 
 * This function will:
 * - Check if the user exists in the 'rewards' collection.
 * - If the user exists, update their total points and add the new trade to their history.
 * - If the user does not exist, create a new user document with the initial trade data.
 */
export async function addTrade(walletAddress:string, tradeAmount:number,liquidity:number,hash:string,points:any) {
    // Reference the user document in the 'rewards' collection by their wallet address
    const userRef = doc(firestore, 'rewards', walletAddress);
    //let points=100;
    // Get the user data from Firestore
    const userSnap = await getDoc(userRef);

    // Calculate the points based on the trade amount (e.g., $10 = 100 points)
    //const points = (tradeAmount / 10) * POINTS_PER_TRADE || 0;

    if (userSnap.exists()) {
        // User exists, update their points and trade history
        const userData = userSnap.data();
        const newTotalPoints = userData.totalPoints + points; // Update the total points

        // Update Firestore document: Add the new trade and update total points
        await updateDoc(userRef, {
            totalPoints: newTotalPoints,
            trades: arrayUnion({
                amount: tradeAmount,
                points: points,
                hash:hash,
                timestamp: new Date(), // Record the trade timestamp
            }),
        });
        //console.log(`Trade added! ${walletAddress} now has ${newTotalPoints} points.`);
    } else {
        // User doesn't exist, create a new user document with the trade and points
        await setDoc(userRef, {
            name: walletAddress,
            totalPoints: points,
            trades: [{
                amount: tradeAmount,
                points: points,
                timestamp: new Date(),
            }],
        });
        console.log(`User created! ${walletAddress} has ${points} points.`);
    }
}

/**
 * Fetch the leaderboard (top users sorted by points).
 * 
 * @param {number} [limitNumber=10] - Limit the number of top users to return (default is 10).
 * @returns {Array} - An array of user data sorted by their total points.
 * 
 * This function queries the 'rewards' collection, orders users by their total points in 
 * descending order, and returns the top `limitNumber` users.
 */
export async function getLeaderboard(limitNumber = 10) {
    try {
        // Reference the 'rewards' collection where user data is stored
        const usersRef = collection(firestore, 'rewards');
        
        // Query the collection, order users by 'totalPoints' in descending order, and limit the results
        const q = query(usersRef, orderBy('totalPoints', 'desc'), limit(limitNumber));
        const querySnapshot = await getDocs(q);

        const leaderboard:any = []; // Array to store the top users' data
        
        // Iterate through each document and push user data to the leaderboard array
        querySnapshot.forEach((doc) => {
            leaderboard.push(doc.data());
        });

        return leaderboard;
    } catch (e) {
        console.error('Error fetching leaderboard: ', e);
        return [];
    }
}

/**
 * Fetch reward data for a specific user.
 * 
 * @param {string} walletAddress - The user's wallet address (unique identifier).
 * @returns {Object|null} - The user's reward data, including total points and trade history, or null if the user is not found.
 * 
 * This function retrieves the user's document from Firestore based on the wallet address
 * and returns their total points and trade history.
 */
export async function getUserRewardData(walletAddress:string | undefined) {
    // Reference the user's document in the 'rewards' collection by their wallet address
    const userRef = doc(firestore, 'rewards', walletAddress||'');
    
    try {
        // Get the user data from Firestore
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // If the user exists, return their data
            const userData = userSnap.data();
            return {
                name: userData.name,
                totalPoints: userData.totalPoints,
                trades: userData.trades,
            };
        } else {
            // If no such user exists, return null and log a message
            console.log('No such user found!');
            return null;
        }
    } catch (e) {
        console.error('Error fetching user data: ', e);
        return null;
    }
}

export const updateStats = async (newSolanaRent:any,newTotalCoins:any,newUsdVolume:any,newDumpCoins:any) => {
    // Reference to the document
    const docRef = doc(firestore, "stats", "solanaRent");
    //const docSnap = await getDoc(docRef);
    //console.log(docSnap.data())
    //console.log(typeof(newSolanaRent),typeof(newTotalCoins),typeof(newUsdVolume))
    //console.log('Ref',docRef)
    try {
      // Update document using increment
      await updateDoc(docRef, {
        solanaRent: increment(newSolanaRent),
        totalCoins: increment(newTotalCoins),
        usdVolume: increment(newUsdVolume),
        dumpCoins:increment(newDumpCoins)
      });
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };