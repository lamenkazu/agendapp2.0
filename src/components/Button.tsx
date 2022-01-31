import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {


    return (
        <button type="submit"

            form='form-cliente'
            id='inserirCliente'>
            {props.children}
        </button>
    )
}