import imgIlustração from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/login.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LogIn() {

    const navigate = useNavigate()
    const { user, signInWithGoogle } = useAuth()

    async function handleLogIn() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/Home')
    }


    return (

        <div id='page-auth'>
            <aside>
                <img src={imgIlustração} alt="ilustração aleatoria" />
                <strong>Agende seus clientes com facilidade</strong>
                <p>Manipule seus dados em tempo-real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <h1>AgendApp</h1>

                    <h2>Log In</h2>
                    <form >

                        <input type="text"
                            placeholder='Usuário'
                        />
                        <input type="password"
                            placeholder='Senha...'
                        />

                    </form>

                    <div className="separator">
                        Ou entre com o Google
                    </div>

                    <button onClick={handleLogIn} className='signInGoogle'>
                        <img src={googleIconImg} alt="icone do google" />
                        Conecte-se com o Google
                    </button>
                </div>
            </main>
        </div>

    )
}