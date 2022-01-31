import '../styles/home.scss'
import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Home() {

    const { user } = useAuth()

    return (
        <div id='page-home'>

            <header>

                <h1>
                    <Link id='headerLink' to='/Home'>AgendApp
                    </Link>
                </h1>

            </header>

            <section id='windows'>
                <aside id='menu'>
                    <nav>
                        <ul>
                            <li><Link to="/Home/Pacientes/Cadastro"> Agendar novo paciente</Link></li>
                            <li><Link to="/Home/Pacientes">Pacientes</Link></li>
                            <li><Link to="/Home/Consultas">Lista de Consultas</Link></li>
                            <li><Link to="/Home/Historico">Histórico de Consultas</Link></li>
                        </ul>
                    </nav>
                </aside>

                <Outlet />

            </section>

        </div>
    )
}