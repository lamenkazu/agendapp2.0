import { Link } from "react-router-dom"

import { useConsulta } from "../hooks/useConsulta"
import { usePaciente } from "../hooks/usePaciente";
import imgEdit from '../assets/img/edit.png'
import { tempoRestante } from "../util/tempoRestante";

export function ListaConsultas() {

    const { consultas } = useConsulta()
    const { pacientes } = usePaciente()

    const listaConsultas = consultas.map(consulta => {

        if (new Date(String(consulta.horario)).getTime() <= Date.now()) {
            //Do nothing
        } else {
            const paciente = pacientes.find(pac => pac.id === consulta.idPaciente)

            return (
                <div key={consulta.id} className='item'>

                    <div className="status">
                        Agendado
                    </div>

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

                    <div className="procedimento">
                        <p>
                            {consulta.procedimento}
                        </p>
                    </div>

                    <div className="prazo column">
                        <span>Prazo:</span>
                        <p>
                            {tempoRestante(consulta.horario)}
                        </p>
                    </div>

                    <div className="valor column">
                        <span>Valor:</span>
                        <p>R${consulta.valor},00</p>
                    </div>

                    <div className="actions">
                        <Link to={`/Home/Consultas/Edit/${consulta.id}`} className="button white edit"
                            title="Editar Consulta">
                            <img src={imgEdit} alt="Editar Consulta" />
                        </Link>

                    </div>

                    <div className="id column">
                        <small className='idCliente' >{consulta.id}</small>
                    </div>



                </div>
            )
        }
    })
    return (
        <div className="container">
            <div className='card'>
                <h2>Lista de Consultas</h2>
                {listaConsultas}
            </div>
        </div>
    )
}