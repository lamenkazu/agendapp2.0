import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../services/firebase";


export async function edita(local: string, id: string | undefined, payload: object) {
    const docRef = doc(database, local + id)

    await updateDoc(docRef, payload)
}

export async function deleta(local: string, id: string | undefined) {
    const docRef = doc(database, local + id)
    await deleteDoc(docRef)
}