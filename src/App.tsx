import Dashboard from "./components/Dashboard"
import Nav from "./components/Nav"
import PaymentTier from "./components/PaymentTier"

function App() {
  return (
    <>
      <Nav />
      <div className="App pb-10">
        <Dashboard />
        <PaymentTier />
      </div>
    </>
  )
}

export default App
