function diasRestantes(horario: Date | undefined) {
    const dataFim = new Date(String(horario)).getTime()
    const tempoRestanteMs = dataFim - Date.now()
    const diaInMs = 1000 * 60 * 60 * 24

    let restante = (tempoRestanteMs / diaInMs).toFixed()

    return restante
}

function horasRestantes(horario: Date | undefined) {
    const dataFim = new Date(String(horario)).getTime()
    const tempoRestanteMs = dataFim - Date.now()
    const horasInMs = 1000 * 60 * 60

    let restante = (((tempoRestanteMs / horasInMs) * 60) / 60).toFixed();
    return restante
}

function minutosRestantes(horario: Date | undefined) {

    const dataFim = new Date(String(horario)).getTime()
    const tempoRestanteMs = dataFim - Date.now()
    const minutosInMs = 1000 * 60 * 60

    let restante = ((tempoRestanteMs / minutosInMs) * 60).toFixed()
    return restante

}

export function tempoRestante(horario: Date | undefined) {
    let informe
    let restante = Number(diasRestantes(horario))

    //checa tempo restante
    //Dias

    if (restante > 1) {
        informe = 'Daqui a ' + restante.toString() + ' dias'
    } else if (restante <= 1) {
        if (restante < 0) restante = 0
        informe = 'Daqui a ' + restante.toString() + ' dia '

        //Horas
        if (restante < 1) {
            restante = Number(horasRestantes(horario))
            if (restante > 1) {
                informe = 'Daqui a ' + restante.toString() + ' horas'
            } else if (restante <= 1) {
                if (restante < 0) restante = 0
                informe = 'Daqui a ' + restante.toString() + ' hora'

                //Minutos
                if (restante < 1) {
                    restante = Number(minutosRestantes(horario))
                    if (restante > 1) {
                        informe = 'Daqui a ' + restante.toString() + ' minutos'
                    } else if (restante <= 1) {
                        if (restante < 0) restante = 0
                        informe = 'Daqui a ' + restante.toString() + ' minuto'
                    }
                }
            }
        }
    }
    return informe
}