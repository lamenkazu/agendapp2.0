import { useContext } from "react";
import { PacienteContext } from "../contexts/PacienteContext";

export function usePaciente() {
    const pac = useContext(PacienteContext)
    return pac
}