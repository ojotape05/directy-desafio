import { useState, useEffect } from 'react'
import '../assets/css/App.css'
import Botao from './Botao'

function App() {
  const [animating, setAnimating] = useState(false)
  const [dados, setDados] = useState(['D2', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'])
  const [dadoSelecionado, setDadoSelecionado] = useState(null)
  const [numeroSorteado, setNumeroSorteado] = useState(null)

  const handleSelect = (tipo) => {

    if(dadoSelecionado == tipo) {
      setDadoSelecionado(null)
      setNumeroSorteado(null)
      return false
    }

    setDadoSelecionado(tipo);
    setNumeroSorteado(null)
    return true
    
  };

  const handleSortNumber = () => {

    setAnimating(true);
    setNumeroSorteado(null)

    setTimeout(() =>{

        fetch('http://localhost:3000/jogar-dado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tipo_dado: dadoSelecionado
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`status: ${response.status}`);
          }
          setAnimating(false)
          return response.json();
        })
        .then(data => {
          
          console.log('Resposta da API:', data);
          setAnimating(false)
          setNumeroSorteado(data.resultado)
          
        })
        .catch(error => {
          setAnimating(false)
          console.error('Erro na requisição:', error);
        });

    }, 2000)

  }

  return (
    <>      
      <div className='header'>     
        {
          dados.map((tipo_dado) => (
            <Botao
              key={tipo_dado}
              tipo={tipo_dado}
              onClick={handleSelect}
              clicked={dadoSelecionado === tipo_dado}
            />
          ))
        }
      </div>

      <div className='body'>

        <div id='elementos-dado'>
          <div className='div-elementos-dado'>
              <img id='exemplo-dado'></img>
          </div>

          <div className='div-elementos-dado'>
            <div id='div-numero' className={animating ? 'animating' : ''}>
              {numeroSorteado}
            </div>
          </div>
        </div>
        

        <div id='div-sortear'>
          <button onClick={handleSortNumber}>
              Sortear número
          </button>
        </div>

      </div>


    </>
  )
}

export default App
