
import { connectSocket } from "./SocketClient"

function App() {
  connectSocket();
  return (
    <div>
      this is the website home page
    </div>
  )
}

export default App
