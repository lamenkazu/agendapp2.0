import { Button } from './Button'
import '../styles/container.scss'
import { FormEvent, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

export function AgendarPacientes() {

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState(Number)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    async function addPaciente(event: FormEvent) {

        event.preventDefault() //Evita Formulário de enviar parametros pro URL

        const collectionRef = collection(database, 'pacientes')
        const payload = { nome, telefone, email }
        await addDoc(collectionRef, payload)

        navigate('/Home/Pacientes')


    }

    return (
        <section className="container">

            <div className='card'>
                <h2>Agendamento de Pacientes</h2>

                <div className="item">

                    <form id='form-cliente' onSubmit={addPaciente}>

                        <div className="itensForm">
                            <label htmlFor="nome">Nome: </label>
                            <input type="text" name="nome" id="nome"
                                onChange={event => setNome(event.target.value)}
                            />
                        </div>

                        <div className='itensForm'>
                            <label htmlFor="telCli">Telefone: </label>
                            <input type="tel" name="telCli" id="telCli"
                                onChange={event => setTelefone(Number(event.target.value))}
                            />
                        </div>

                        <div className='itensForm'>
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>

                        <Button type="submit" form='form-cliente' id='inserirCliente'>
                            Inserir Paciente
                        </Button>


                    </form>
                </div>

            </div>

        </section>
    )
}