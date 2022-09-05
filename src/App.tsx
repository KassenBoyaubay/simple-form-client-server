import Dashboard from "./components/Dashboard"
import Nav from "./components/Nav"
import PaymentTier from "./components/PaymentTier"
import Tasks from "./components/Tasks/Tasks"

function App() {
  return (
    <>
      <Nav />
      <div className="App pb-10">
        <Dashboard />
        <PaymentTier />
        <Tasks />
      </div>
    </>
  )
}

export default App
