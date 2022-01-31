import { Link } from "react-router-dom"

import imgEdit from '../assets/img/edit.png'

export function Historico() {

    return (
        <div className="container">

            <div className='card'>
                <h2>Lista de Consultas</h2>

                <div className='item'>

                    <div className="id column"> 1 </div>
                    <div className="status">Realizado </div>

                    <div className="name column">Erick Etiene</div>
                    <div className='tel column'>
                        <small>
                            31992855944
                        </small>
                    </div>

                    <div className='mail column'>
                        <p>
                            333.erick@gmail.com
                        </p>
                    </div>
                    <div className="procedimento">
                        <p>Limpeza</p>
                    </div>
                    <div className="prazo column">
                        <span>Data:</span>
                        <p>04/01/2022</p>
                    </div>
                    <div className="valor column">
                        <span>Valor:</span>
                        <p>R$ 0,00</p>
                    </div>

                    <div className="actions">
                        <Link to="#" className="button white edit"
                            title="Editar Consulta">
                            <img src={imgEdit} alt="Editar Consulta" />
                        </Link>

                    </div>


                </div>

            </div>

        </div>
    )
}