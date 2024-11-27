import { firestore } from './firebase'; // Import Firestore from your Firebase setup
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, getDocs, query, orderBy, limit, increment, addDoc, serverTimestamp } from 'firebase/firestore';


export const reportBug = async (title:string, description:any, priority = "medium", status = "open") => {
    try {
      // Reference the 'bugs' collection
      const bugsCollection = collection(firestore, "bugs");
  
      // Add a new bug document
      const docRef = await addDoc(bugsCollection, {
        title: title,
        description: description,
        priority: priority,
        status: status,
        timestamp: serverTimestamp() // Add a timestamp
      });
  
      console.log(`Bug added with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding bug: ", error);
    }
  };