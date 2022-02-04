import { useConsulta } from "../hooks/useConsulta";
import { usePaciente } from "../hooks/usePaciente";
import imgEdit from '../assets/img/edit.png'
import { Link } from "react-router-dom";

export function ListaHistorico() {
    const { consultas } = useConsulta()
    const { pacientes } = usePaciente()

    const listaHistorico = consultas.map(consulta => {

        if (new Date(String(consulta.horario)).getTime() <= Date.now()) {
            const paciente = pacientes.find(pac => pac.id === consulta.idPaciente)

            const dayName = new Array("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado")
            const monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
            const time = new Date(String(consulta.horario))
            const data = `${time.getDate()} de ${monName[time.getMonth()]} de ${time.getFullYear()} - ${dayName[time.getDay()]}`

            return (
                <div key={consulta.id} className="item">

                    <div className="status">
                        Realizado
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
                        <span>Data:</span>
                        <p>
                            {data}
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
            <div className="card">
                <h2>Historico de Consultas</h2>
                {listaHistorico}
            </div>
        </div>
    )
}