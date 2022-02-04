import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LogIn } from "./pages/LogIn";
import { Home } from './pages/Home'
import { ListaPacientes } from "./components/ListaPacientes";
import { AgendarPacientes } from "./components/AgendarPacientes";
import { ListaConsultas } from "./components/ListaConsultas";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PacienteEdit } from "./components/PacienteEdit";
import { PacienteContextProvider } from "./contexts/PacienteContext";
import { ModalLogOut } from "./components/ModalLogOut";
import { ConsultaContextProvider } from "./contexts/ConsultasContext";
import { AddConsulta } from "./components/AddConsulta";
import { ListaHistorico } from "./components/ListaHistorico";
import { ConsultaEdit } from "./components/ConsultaEdit";
import { ConsultasPessoais } from "./components/ConsultasPessoais";


export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PacienteContextProvider>
          <ConsultaContextProvider>
            <Routes>
              <Route path='/' element={<LogIn />} />
              <Route path='/Home' element={<Home />} >

                <Route path='/Home/Logout' element={<ModalLogOut />} />

                <Route path='/Home/Pacientes/Cadastro' element={<AgendarPacientes />} />

                <Route path='/Home/Pacientes' element={<ListaPacientes />} />

                <Route path='/Home/Pacientes/Edit/:id' element={<PacienteEdit />} />

                <Route path='/Home/Pacientes/AddConsulta/:id' element={<AddConsulta />} />

                <Route path='/Home/Pacientes/Lista-de-Consultas/:id' element={<ConsultasPessoais />} />

                <Route path='/Home/Consultas' element={<ListaConsultas />} />

                <Route path='/Home/Consultas/Edit/:id' element={<ConsultaEdit />} />

                <Route path='/Home/Historico' element={<ListaHistorico />} />
              </Route>
            </Routes>
          </ConsultaContextProvider>
        </PacienteContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
