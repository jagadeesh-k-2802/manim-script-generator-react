import { Navbar } from "./components/Navbar"
import { Header } from "./components/Header"
import { PromptForm } from "./components/PromptForm"

function App() {
  return (
    <div className="min-h-screen w-full bg-[rgb(10,10,10)] text-white">
      <Navbar />
      <main className="w-full">
        <div className="mx-auto max-w-3xl px-4">
          <Header />
          <PromptForm />
        </div>
      </main>
    </div>
  )
}

export default App
