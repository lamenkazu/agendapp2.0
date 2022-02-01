import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LogIn } from "./pages/LogIn";
import { Home } from './pages/Home'
import { ListaPacientes } from "./components/ListaPacientes";
import { AgendarPacientes } from "./components/AgendarPacientes";
import { ListaConsultas } from "./components/ListaConsultas";
import { Historico } from "./components/Historico";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PacienteEdit } from "./components/PacienteEdit";
import { PacienteContextProvider } from "./contexts/PacienteContext";
import { ModalLogOut } from "./components/ModalLogOut";


export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PacienteContextProvider>
          <Routes>
            <Route path='/' element={<LogIn />} />
            <Route path='/Home' element={<Home />} >

              <Route path='/Home/Logout' element={<ModalLogOut />} />
              <Route path='/Home/Pacientes/Cadastro' element={<AgendarPacientes />} />

              <Route path='/Home/Pacientes' element={<ListaPacientes />} />

              <Route path='/Home/Pacientes/Edit/:id' element={<PacienteEdit />} />

              <Route path='/Home/Consultas' element={<ListaConsultas />} />

              <Route path='/Home/Historico' element={<Historico />} />
            </Route>
          </Routes>
        </PacienteContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
