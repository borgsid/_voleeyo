import { useState, useEffect } from 'react';
const About =({ activeTab, setActiveTab})=>{
    const [showEmail, setShowEmail] = useState(false);
    useEffect(()=>{
        setActiveTab("about")
        setShowEmail(localStorage.getItem("voleeyo_login"))
    })
    return (
        <div className="my-bio">
        {(showEmail!=undefined)&&  <h1>👋 Hi there! My name's <a className='sydney-color' href="mailto:silsfinest@vodafone.it?subject=[Voleeyo] Contact request">Sydney</a></h1>}
        {(showEmail==undefined)&&<h1>👋 Hi there! My name's Sydney</h1>}
          <p>
            🌍 I believe that the best way to experience a new place is by getting to know the people and their way of life. That's why I have traveled extensively throughout Europe and the world, for events, leisure, and volunteering.
          </p>
          <p>
            🧳 I have embarked on multiple experiences, from cultural to educational, and have lived as a local for up to 3 months at a time, in different parts of the world. I have traveled <span className='sydney-world'>16%</span> of the world so far, and I'm always looking for new opportunities to explore and learn.
          </p>
          <p>
            💡 Through my travels, I have come to the conclusion that volunteering is the best way to see the world as a traveler and not just a tourist. It allows me to give back to the local community while learning their ways. I have volunteered at local festivals like <span className='sydney-milano'>PianoCity Milano</span> and <a  href="https://www.fescaaal.org/" className='sydney-milano'>FESCAAAL film festival</a>, as well as expos like <span className='sydney-milano'>Expo2015 Milano</span> and <span className='sydney-russia'>Expo2017 Astana</span>. I've also volunteered at World Cups/Olympics/Pan Am Games such as <span className='sydney-russia'>Sochi2014</span> Winter Olympics, <span className='sydney-america'>Toronto 2015</span> Pan Am Games, <span className='sydney-america'>Rio2016</span> Summer Olympics, and <span className='sydney-russia'>Russia2018 </span> World Cup. Additionally, I help local associations get visibility buy organizing and getting involved with their activities, such as <a href='https://www.associazionevivaio.com/' className='sydney-milano'>Associazione VIVAIO</a> and <a href="https://www.milanocittastato.it/" className='sydney-milano'>Milano Città Stato</a>, and used to organize Engineering competitions in University like <a href='https://bestmilano.it/it/category/ebec/' className='sydney-milano'>EBEC MILANO</a> at Polimi.
          </p>
          <p>
            💻 I'm excited to share with you on <span className='sydney-world'>Voleeyo</span> what the world has to offer and to continue to learn and grow through my travels and volunteer work!
          </p>
        </div>
      );
}
export default About;