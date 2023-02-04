
import { BrowserRouter } from "react-router-dom"
import { TransactionProvider } from "./contexts/transactionsContext"
import HomeApp from "./screens/home"
import { SignInApp } from "./screens/sign"


function App() {

  return (
    <BrowserRouter>
    <SignInApp />
    <TransactionProvider>
      <HomeApp />
    </TransactionProvider>
  </BrowserRouter>
  )
}

export default App
