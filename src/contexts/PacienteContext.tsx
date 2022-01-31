import { createContext, ReactNode, useEffect, useState } from "react";
import { database } from "../services/firebase";
import { collection, onSnapshot } from 'firebase/firestore'

type PacienteType = {
    id?: string | undefined;
    email?: string | undefined;
    nome?: string | undefined;
    telefone?: number | undefined;
}

type PacienteContextProviderProps = {
    children: ReactNode;
}

type PacienteContextType = {
    pacientes: PacienteType[];
}

export const PacienteContext = createContext({} as PacienteContextType)

export function PacienteContextProvider(props: PacienteContextProviderProps) {

    const [pacientes, setPacientes] = useState<PacienteType[]>([])

    useEffect(() =>
        onSnapshot(collection(database, 'pacientes'), (snapshot) => {
            setPacientes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }), [])

    return (
        <PacienteContext.Provider value={{ pacientes }}>
            {props.children}
        </PacienteContext.Provider>
    )
}