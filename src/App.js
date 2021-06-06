import { ChakraProvider } from "@chakra-ui/react";
import Reloj from "./Reloj";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Reloj />
      </div>
    </ChakraProvider>
  );
}

export default App;
