import { useState } from 'react'
import '../assets/css/App.css'
import Botao from './Botao'

import dadoD2 from '../assets/img/dado-d2.png';
import dadoD4 from '../assets/img/dado-d4.png';
import dadoD6 from '../assets/img/dado-d6.png';
import dadoD8 from '../assets/img/dado-d8.png';
import dadoD10 from '../assets/img/dado-d10.png';
import dadoD12 from '../assets/img/dado-d12.png';
import dadoD20 from '../assets/img/dado-d20.png';
import dadoD100 from '../assets/img/dado-d100.png';

function App() {

  const [animating, setAnimating] = useState(false)
  const [dados, setDados] = useState(['D2', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'])
  const [dadoSelecionado, setDadoSelecionado] = useState(null)
  const [imgDadoSelecionado, setImgDadoSelecionado] = useState(null)
  const [numeroSorteado, setNumeroSorteado] = useState(null)
  const [historico, setHistorico] = useState('| ')

  const depara_tipo_image = {
    "D2": dadoD2,
    "D4": dadoD4,
    "D6": dadoD6,
    "D8": dadoD8,
    "D10": dadoD10,
    "D12": dadoD12,
    "D20": dadoD20,
    "D100": dadoD100
  }

  const handleCleanHist = () => {
    setHistorico('| ')
  }

  const handleSelect = (tipo) => {

    if(dadoSelecionado == tipo) {
      setDadoSelecionado(null)
      setNumeroSorteado(null)
      setImgDadoSelecionado(null)
      return false
    }

    setDadoSelecionado(tipo);
    setNumeroSorteado(null)
    setImgDadoSelecionado(depara_tipo_image[tipo])
    return true
    
  };

  const handleSortNumber = () => {

    setAnimating(true);
    setNumeroSorteado(null)

    setTimeout(() =>{

        fetch('http://localhost:3000/girar-dado', {
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
          setHistorico(historico + `${dadoSelecionado}: ${data.resultado} | `)

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

        <div className='conteudo-principal'>

          <div id='elementos-dado'>
            <div className='div-elementos-dado'>
                <div id='exemplo-dado' className={animating ? 'animating' : ''}>
                  {imgDadoSelecionado && (<img src={imgDadoSelecionado} />)}
                </div>
                
            </div>

            <div className='div-elementos-dado'>
              <div id='div-numero'>
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

        <div id='div-hist'>

          <div id='historico'>
            {historico}
          </div>

          <div id='button-historico'>
            <button onClick={handleCleanHist}>
              Limpar histórico
            </button>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
