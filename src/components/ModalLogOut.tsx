import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import imgDelete from '../assets/img/apagar.png'
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase";

export function ModalLogOut() {

    const navigate = useNavigate()
    const { user, logOut } = useAuth()

    async function handleLogOut() {
        if (user) {
            await logOut()
        }
        navigate('/Home')
    }

    return (
        <section id='page-modal'>

            <div id='mod' className="modal-wrapper on">
                <div className="modal">
                    <img id='img-modal' src={imgDelete} alt="Excluir Consulta" title="Excluir Consulta" />
                    <h3>Deseja desconectar conta?</h3>
                    <p>Quer mesmo sair do aplicativo? <br />
                        Não é possível fazer alterações quando desconectaado.
                    </p>
                    <footer>

                        <Link id='btn-cancell' to='/Home' >Cancelar</Link>
                        <button className="button red" onClick={handleLogOut} type="submit" form="apagar">Desconectar</button>

                    </footer>

                </div>

            </div>

        </section >
    )
}