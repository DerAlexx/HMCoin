import './App.css';

import Menubar from './component/menubar';

import bigimage from './assets/startseite.jpg'

function App() {
  return (
    <div className="App">
        <Menubar></Menubar>
        <img class="bigLogo" alt="Bitcoin" src={bigimage} style={{opacity: 0.90}}></img>
        <hr></hr>
        <div style={{marginLeft: '10%', width:'80%', top: '80%', position: 'absolute'}}>
          <h2 style={{color:'#ff5a5a', fontSize: '46px'}}>HMCoin - Cryptocurrency</h2>
          <br></br>
          <p>
            <ul style={{listStyle: "none", fontSize: '20px', display: 'inline-flex', color:'#171a21', textTransform: 'uppercase'}}>
              <li>Sicher -</li>
              <li style={{paddingLeft: '10px'}}>Anonym -</li>
              <li style={{paddingLeft: '10px'}}>Zuverlässig</li>
            </ul>
          </p>
          <hr style={{borderColor: 'gray'}}></hr>
          <p>
              
          </p>
        </div>
    </div>
  );
}

export default App;
