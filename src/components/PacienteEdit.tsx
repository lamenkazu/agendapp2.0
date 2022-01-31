import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";

import { database } from "../services/firebase";

import imgDelete from '../assets/img/apagar.png'
import '../styles/modal.scss'

export function PacienteEdit() {

    /***************************************************************************************************************************
                        useEffect Funcional para encontrar Paciente usando o Find 
    Passando o paciente no [vetor] do useEffect passou a buscar toda vez que atualiza a pagina
    porém decidi por deixar em funcionamento a utilização da documentação própria do firebase para encontrar o paciente.
    
    
    
                                    const paciente = pacientes.find(pac => pac.id === idPaciente)
                                    const { pacientes } = usePaciente()
                                    
                                    useEffect(() => {
                                        setNome(String(paciente?.nome))
                                        setTelefone(Number(paciente?.telefone))
                                        setEmail(String(paciente?.email))
                                        
                                    }, [paciente]) 
    
    ******************************************************************************************************************************/

    const idPaciente = useParams().id
    const navigate = useNavigate()


    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState(Number)
    const [email, setEmail] = useState('')

    //useEffect funcional utilizando a documentação de pegar paciente do Firebase
    useEffect(() => {
        async function pegaPaciente() {
            const docRef = doc(database, 'pacientes/' + idPaciente)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const paciente = docSnap.data()
                setNome(paciente.nome)
                setEmail(paciente.email)
                setTelefone(paciente.telefone)
            }
        }
        pegaPaciente()

    }, [])

    //Edita os dados do paciente no Firestore ao envio do formulário e retorna para a pagina de pacientes.
    async function editPaciente(event: FormEvent) {
        event.preventDefault()

        const docRef = doc(database, "pacientes/" + idPaciente)
        const payload = { nome, email, telefone }

        await updateDoc(docRef, payload)

        navigate('/Home/Pacientes')

    }

    //Deleta o paciente da pagina selecionada do banco de dados Firestore
    async function deletePaciente() {

        const docRef = doc(database, "pacientes/" + idPaciente)
        await deleteDoc(docRef)

        navigate('/Home/Pacientes')
    }

    //Abre e fecha Modal de confirmação de exclusão de Paciente
    const abrirModal = () => document.getElementById('mod')?.classList.add('on')
    const fecharModal = () => document.getElementById('mod')?.classList.remove('on')


    return (
        <div>
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

        </div >

    )
}