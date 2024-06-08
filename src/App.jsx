import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-[25px] h-[25px] bg-blue-500">
      {/* Content goes here */}
    </div>
  );
}

export default App
