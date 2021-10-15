import { IClient } from 'components/Client';
import { firestore } from 'config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';
import { getDate } from 'utils/date';

export type DocRef = DocumentReference<DocumentData>;

type Doc = Omit<IClient, "birthDate" | "createdAt"> & {
  birthDate: {
    seconds: number;
  };
  createdAt: {
    seconds: number;
  };
}

export async function CreateClientService(data: IClient) {
  try {
    const docRef = await addDoc(collection(firestore.getFirestore(), 'clients'), data);
    return docRef;
  } catch(err) {
    throw new Error(String(err));
  }
}

export async function GetClientsService(id: string) {
  try {
    const q = query(collection(firestore.getFirestore(), 'clients'), where('ownerId', '==', id));
    const { docs } = await getDocs(q);
    const clients = docs.map(dc => {
      const data = dc.data() as Doc;
      const birthDate = getDate(data.birthDate);
      const createdAt = getDate(data.createdAt);
      return {...data, birthDate, createdAt, doc: dc.ref};
    });
    return clients;
  } catch(err) {
    throw new Error(String(err));
  }
}

export type IData = Omit<IClient, | "createdAt" | "ownerId">

export async function UpdateClientService(data: IData) {
  try {
    await updateDoc(data.doc!, { ...data });
    return data.doc;
  } catch (err) {
    throw new Error(String(err));
  }
}

export async function GetClientService(ref: DocRef) {
  try {
    const doc = await getDoc(ref);
    const data = doc.data() as Doc;

    return {
      doc: data.doc,
      id: data.id,
      name: data.name,
      phone: data.phone,
      status: data.status,
      ownerId: data.ownerId,
      income: data.income,
      createdAt:getDate(data.createdAt),
      birthDate:getDate(data.birthDate)
    };
  } catch(err) {
    throw new Error(String(err));
  }
}

export async function RemoveClientService(ref: DocRef) {
  try {
    await deleteDoc(ref);
    return;
  } catch(err) {
    throw new Error(String(err));
  }
}
