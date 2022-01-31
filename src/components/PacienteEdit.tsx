import { FormEvent, useEffect, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { Link, URLSearchParamsInit, useNavigate, useParams } from "react-router-dom";

import { usePaciente } from "../hooks/usePaciente";
import { database } from "../services/firebase";

import imgDelete from '../assets/img/apagar.png'
import '../styles/modal.scss'

type PacienteType = {
    id: string;
    email: string;
    nome: string;
    telefone: number;
}


export function PacienteEdit() {

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState(Number)
    const [email, setEmail] = useState('')
    const { pacientes } = usePaciente()

    const idPaciente = useParams().id
    const navigate = useNavigate()


    useEffect(() => {
        const paciente = pacientes.find(pac => pac.id === idPaciente)
        setNome(String(paciente?.nome))
        setTelefone(Number(paciente?.telefone))
        setEmail(String(paciente?.email))
        if (!paciente?.nome) {
            navigate(`/Home/Pacientes`)
        }
    }, [])

    async function editPaciente(event: FormEvent) {
        event.preventDefault()

        const docRef = doc(database, "pacientes/" + idPaciente)
        const payload = { nome, email, telefone }

        await setDoc(docRef, payload)

        navigate('/Home/Pacientes')

    }

    async function deletePaciente() {

        const docRef = doc(database, "pacientes/" + idPaciente)
        await deleteDoc(docRef)

        navigate('/Home/Pacientes')
    }

    const abrirModal = () => document.getElementById('mod')?.classList.add('on')
    const fecharModal = () => document.getElementById('mod')?.classList.remove('on')

    return (
        <div id='container-modal'>
            <section className="container" id='edit'>

                <div className='card'>
                    <h2>Editar Paciente</h2>

                    <div className="item">
                        <form id='form-altera' onSubmit={editPaciente}>

                            <div className='itensForm'>
                                <label htmlFor="nome">Nome</label>
                                <input type="text" name="nome" id="nome"
                                    value={nome}
                                    onChange={event => setNome(event.target.value)}
                                />
                            </div>

                            <div className='itensForm'>
                                <label htmlFor="tel">Tel &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                <input type="text" name="tel" id="tel"
                                    value={telefone}
                                    onChange={event => setTelefone(Number(event.target.value))}
                                />
                            </div>

                            <div className='itensForm'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>

                            <div id='editBox' className='actions'>
                                <Link to="#" onClick={abrirModal} className='button'>
                                    <img id='apagarConsulta' src={imgDelete} alt="" />
                                </Link>
                                <button type="submit" form='form-altera' id='salvarCliente' >
                                    Salvar Alterações
                                </button>
                            </div>

                        </form>

                    </div>

                </div>
            </section>

            <section id='page-modal'>

                <div id='mod' className="modal-wrapper">
                    <div className="modal">
                        <img id='img-modal' src={imgDelete} alt="Excluir Consulta" title="Excluir Consulta" />
                        <h3>Excluir Paciente?</h3>
                        <p>Quer mesmo excluir esse paciente? <br />
                            Ele será apagado para sempre junto de todas as suas consultas e arquivos.
                        </p>
                        <footer>

                            <a id='btn-cancell' onClick={fecharModal} >Cancelar</a>
                            <button className="button red" onClick={deletePaciente} type="submit" form="apagar">Excluir Paciente</button>

                        </footer>

                    </div>

                </div>

            </section >

        </div>

    )
}