import { useState } from 'react'
import '../assets/css/App.css'
import Botao from './Botao'

function App() {
  const [dados, setDados] = useState(['D2', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'])
  const [dadoSelecionado, setDadoSelecionado] = useState(null)

  const handleClick = (tipo) => {
    setDadoSelecionado(tipo);
  };
  
  
  return (
    <>      
      <div className='header'>     
        {
          dados.map((tipo_dado) => (
            <Botao
              key={tipo_dado}
              tipo={tipo_dado}
              onClick={handleClick}
              clicked={dadoSelecionado === tipo_dado}
            />
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
