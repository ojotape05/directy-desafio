import { useState } from 'react'
import '../assets/css/App.css'
import Botao from './Botao'

function App() {
  const [count, setCount] = useState(0)
  const [botoes, setBotoes] = useState(['D2', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'])

  return (
    <>      
      <div className='header'>     
        {
          botoes.map((el) => (
            <Botao key={el} tipo={el}/>
          ))
        }
      </div>

      <div className='body'>
        <div>
          dado
        </div>
        <div>
          numero
        </div>
      </div>


    </>
  )
}

export default App
