import { collection, doc, limitToLast, onSnapshot, orderBy, query } from 'firebase/firestore'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { database } from '../services/firebase'

type ConsultaType = {
    id?: string;
    idPaciente?: string;
    createdAt?: number;
    horario?: Date;
    procedimento?: string;
    valor?: number;
}

type ConsultaContextType = {
    consultas: ConsultaType[];
}

type ConsultaContextProviderProps = {
    children: ReactNode;
}

export const ConsultaContext = createContext({} as ConsultaContextType)

export function ConsultaContextProvider(props: ConsultaContextProviderProps) {

    const [consultas, setConsultas] = useState<ConsultaType[]>([])

    useEffect(() => {
        onSnapshot(collection(database, 'consultas'), (snapshot) => {
            setConsultas(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, []);

    return (
        <ConsultaContext.Provider value={{ consultas }}>
            {props.children}
        </ConsultaContext.Provider>
    )


}