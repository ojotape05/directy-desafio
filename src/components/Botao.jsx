import { useState } from 'react'
import '../assets/css/Botao.css'

function Botao({tipo}) {
  const [count, setCount] = useState(0)

  return (
    <>      
        <button className='wood-button'>
            {tipo}
        </button>        
    </>
  )
}

export default Botao
