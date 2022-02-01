import '../styles/home.scss'
import { Outlet, Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { ProfileArea } from '../components/ProfileArea'
import { auth } from '../services/firebase'
import { sign } from 'crypto'

export function Home() {

    const { user, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing Info from Google')
                }
                signInWithGoogle()
                navigate('/Home')
            }
        })
    }, [])

    useEffect(() => {
        if (!user) {

            navigate('/')
        }
    }, [user])

    return (
        <div id='page-home'>

            <header>

                <h1>
                    <Link id='headerLink' to='/Home'>AgendApp
                    </Link>
                </h1>
            </header>

            <ProfileArea />
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