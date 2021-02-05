import './App.css';

import Menubar from './component/menubar';

import bigimage from './assets/startseite.jpg'

function App() {
  return (
    <div className="App">
        <Menubar></Menubar>
        <img class="bigLogo" alt="Bitcoin" src={bigimage} style={{opacity: 0.90}}></img>
        <hr></hr>
        <br></br>
        <div style={{marginLeft: '10%', width:'80%', top: '80%', position: 'absolute', zIndex:-20}}>
          <h2 style={{color:'#ff5a5a', fontSize: '46px'}}>HMCoin - Cryptocurrency</h2>
          <br></br>
          <p>
            <ul style={{listStyle: "none", fontSize: '20px', display: 'inline-flex', color:'#171a21', textTransform: 'uppercase'}}>
              <li>Sicher -</li>
              <li style={{paddingLeft: '14px'}}>Anonym -</li>
              <li style={{paddingLeft: '14px'}}>Zuverlässig</li>
            </ul>
          </p>
          <hr style={{borderColor: 'gray'}}></hr>
          <p style={{display: 'inline-flex'}}>
            <div class="card" style={{width: "14rem", borderColor: 'gray', marginLeft: '20px', marginRight: '20px'}}>
              <div class="card-body">
                <h5 class="card-title">Start mining.</h5>
                <a href="#" class="card-link" style={{color:'#ff5a5a'}}>» Here</a>
              </div>
            </div>
            <div class="card" style={{width: "14rem", borderColor: 'gray', marginLeft: '20px', marginRight: '20px'}}>
              <div class="card-body">
                <h5 class="card-title">See the Blockchain.</h5>
                <a href="#" class="card-link" style={{color:'#ff5a5a'}}>» Here</a>
              </div>
            </div>
            <div class="card" style={{width: "14rem", borderColor: 'gray', marginLeft: '20px', marginRight: '20px'}}>
              <div class="card-body">
                <h5 class="card-title">Send some coins.</h5>
                <a href="/send" class="card-link" style={{color:'#ff5a5a'}}>» Here</a>
              </div>
            </div>
            <div class="card" style={{width: "14rem", borderColor: 'gray', marginLeft: '20px', marginRight: '20px'}}>
              <div class="card-body">
                <h5 class="card-title">All transactions.</h5>
                <a href="/transactions" class="card-link" style={{color:'#ff5a5a'}}>» Here</a>
              </div>
            </div>
          </p>
        </div>
    </div>
  );
}

export default App;
