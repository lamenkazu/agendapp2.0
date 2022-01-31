import { Link } from "react-router-dom"


import imgEdit from '../assets/img/edit.png'
import imgAdd from '../assets/img/adicionar.png'
import imgList from '../assets/img/lista.png'
import '../styles/container.scss'
import { usePaciente } from "../hooks/usePaciente";


export function ListaPacientes() {

    const { pacientes } = usePaciente()

    //Caminho dos botões
    let pathEdit
    let pathAdd
    let pathList

    let listaPacientes = pacientes.map(
        (pac) =>
            <div key={pac.id} className='item'>

                <form id='form-cliente'>

                    <div id='showTitle'>
                        <div className="name column">
                            {pac.nome}
                        </div>

                        <div className='tel column'>
                            <small>
                                {pac.telefone}
                            </small>
                        </div>

                        <div className='mail column'>
                            <p>
                                {pac.email}
                            </p>
                        </div>
                    </div>

                    <div className='link'>
                        {pathEdit = `/Home/Pacientes/Edit/${pac.id}`}
                        {pathAdd = `/Home/Pacientes/AddConsulta/${pac.id}`}
                        {pathList = `/Home/Pacientes/Lista-de-Consultas/${pac.id}`}
                    </div>

                    <div className="actions">

                        <Link to={pathEdit} className="button white edit" title="Editar Paciente">
                            <img src={imgEdit} alt="Botão Editar Dados Paciente" />
                        </Link>

                        <Link to={pathAdd} className='button white edit'>
                            <img src={imgAdd} alt="Botão Adicionar Consuta" />
                        </Link>

                        <Link to={pathList} className='button white edit'>
                            <img src={imgList} alt="Botão Lista de consultas" />
                        </Link>

                    </div>

                    <div className="id column">
                        <small className='idCliente'>{pac.id}</small>
                    </div>

                </form>

            </div>
    )

    return (
        <div className="container">

            <div className='card'>

                <h2>Lista de Pacientes</h2>
                {listaPacientes}

            </div>
        </div>
    )
}

