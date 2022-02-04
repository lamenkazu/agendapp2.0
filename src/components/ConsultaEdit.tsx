import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import imgDelete from '../assets/img/apagar.png'
import { useConsulta } from "../hooks/useConsulta";
import { usePaciente } from "../hooks/usePaciente";
import { database } from "../services/firebase";
import { deleta, edita } from "../util/editUtils";

export function ConsultaEdit() {

    const { pacientes } = usePaciente()
    const { consultas } = useConsulta()
    const idConsulta = useParams().id
    const navigate = useNavigate()

    const consData = consultas.find(cons => cons.id === idConsulta)
    const paciente = pacientes.find(pac => pac.id === consData?.idPaciente)

    const [procedimento, setProcedimento] = useState('')
    const [horario, setHorario] = useState('')
    const [valor, setValor] = useState(Number)

    useEffect(() => {
        async function pegaConsulta() {
            const docRef = doc(database, 'consultas/' + idConsulta)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const consulta = docSnap.data()
                setProcedimento(consulta.procedimento)
                setHorario(consulta.horario)
                setValor(consulta.valor)
            }
        }
        pegaConsulta()
    }, [])

    async function editaConsulta(event: FormEvent) {
        event.preventDefault()
        await edita('consultas/', idConsulta, { procedimento, horario, valor })

        navigate(-1)
    }

    async function deleteConsulta() {
        await deleta('consultas/', idConsulta)

        navigate(-1)
    }

    const abrirModal = () => document.getElementById('mod')?.classList.add('on')
    const fecharModal = () => document.getElementById('mod')?.classList.remove('on')

    return (
        <div>
            <section className="container" id='edit'>
                <div className="card">
                    <h2>Editar Consulta</h2>

                    <div className="item">
                        <div id='showTitle'>
                            <div className="name column">
                                {paciente?.nome}
                            </div>

                            <div className='tel column'>
                                <small>
                                    {paciente?.telefone}
                                </small>
                            </div>

                            <div className='mail column'>
                                <p>
                                    {paciente?.email}
                                </p>
                            </div>
                        </div>
                        <form id='form-altera' onSubmit={editaConsulta}>

                            <div className="itensForm">
                                <label htmlFor="procedimento">Procedimento:</label>
                                <input type="text" name="procedimento" id="procedimento"
                                    value={procedimento}
                                    onChange={event => setProcedimento(event.target.value)}
                                />
                            </div>

                            <div className="itensForm">
                                <label htmlFor="data">Horario:</label>
                                <input type='datetime-local' name="data" id="data"
                                    value={horario}
                                    onChange={event => setHorario(event.target.value)}
                                />
                            </div>

                            <div className="itensForm">
                                <label htmlFor="valor">Valor:</label>
                                <input type="number" name="valor" id="valor"
                                    value={valor}
                                    onChange={event => setValor(Number(event.target.value))}
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
                        <h3>Excluir Consulta?</h3>
                        <p>Quer mesmo excluir essa consulta já agendada? <br />
                            Ela será apagada para sempre.
                        </p>
                        <footer>

                            <Link id='btn-cancell' to='#' onClick={fecharModal} >Cancelar</Link>
                            <button className="button red" onClick={deleteConsulta} type="submit" form="apagar">Excluir Consulta</button>

                        </footer>

                    </div>

                </div>

            </section >
        </div>

    )
}