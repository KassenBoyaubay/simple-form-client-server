import Dashboard from "./components/Dashboard"
import Functionality from "./components/Functionality/Functionality"
import Nav from "./components/Nav"
import PaymentTier from "./components/PaymentTier"
import Tasks from "./components/Tasks/Tasks"

function App() {
  return (
    <>
      <Nav />
      <div className="App pb-10 pt-20">
        <Functionality />
        <Dashboard />
        <PaymentTier />
        <Tasks />
      </div>
    </>
  )
}

export default App
