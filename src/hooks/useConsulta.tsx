import { useContext } from "react";
import { ConsultaContext } from "../contexts/ConsultasContext";

export function useConsulta() {
    const cons = useContext(ConsultaContext)
    return cons
}