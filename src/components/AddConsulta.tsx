import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../services/firebase";

export function AddConsulta() {

    const [procedimento, setProcedimento] = useState('')
    const [horario, setHorario] = useState(Date)
    const [valor, setValor] = useState(Number)
    const idPaciente = useParams().id

    const navigate = useNavigate()


    async function adicionaConsulta(event: FormEvent) {
        event.preventDefault()
        const createdAt = Date.now()

        const collectionRef = collection(database, 'consultas')
        const payload = { procedimento, horario, valor, idPaciente, createdAt }
        await addDoc(collectionRef, payload)

        navigate('/Home/Consultas')

    }

    return (
        <section className='container'>
            <div className='card'>
                <h2>Adicionar uma consulta</h2>


                <div className="item">

                    <form id="form-consulta" onSubmit={adicionaConsulta}>

                        <div id='divProc' className='itensForm'>
                            <label id='lblProc' htmlFor="nomeProc">Procedimento</label>
                            <input type="text" name="nomeProc" id="nomeProc"
                                onChange={event => setProcedimento(event.target.value)}
                            />
                        </div>

                        <div className='itensForm'>
                            <label htmlFor="horario">Horario</label>
                            <input type="datetime-local" name="horario" id="horario"
                                onChange={event => setHorario(event.target.value)}
                            />
                        </div>

                        <div className='itensForm'>
                            <label htmlFor="txtValor">Valor:</label>
                            <input type="number" step='any' name="txtValor" id="txtValor"
                                onChange={event => setValor(Number(event.target.value))}
                            />
                        </div>
                        <button type="submit" form='form-consulta' id='inserirCliente' >
                            Inserir Consulta
                        </button>

                    </form>

                </div>
            </div>
        </section>
    )
}