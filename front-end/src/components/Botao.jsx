import { useState } from 'react'
import '../assets/css/Botao.css'

function Botao({ tipo, onClick, clicked }) {

  return (
    <>      
        <button
          onClick={() => onClick(tipo)}
          className={`wood-button ${clicked ? 'clicked' : ''}`}
        >
            {tipo}
        </button>        
    </>
  )
}

export default Botao
