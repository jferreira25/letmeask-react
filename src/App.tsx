import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {Route,BrowserRouter} from 'react-router-dom'
import {createContext} from 'react'
import { useState } from "react";

export const TestContext = createContext({} as any);
function App() {
  const [value, setValue] = useState('Teste');

  return (
    <BrowserRouter>
    <TestContext.Provider value={{value,setValue}}>
    <Route path="/" exact component={Home} />
    <Route path="/rooms/new" component={NewRoom} />
    </TestContext.Provider>
    </BrowserRouter>
  );
}

export default App;
