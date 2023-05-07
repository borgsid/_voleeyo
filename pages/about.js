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
            🧳 I have embarked on multiple experiences, from cultural to educational, and have lived as a local for up to 3 months in different parts of the world. I have traveled 16% of the world so far, and I'm always looking for new opportunities to explore and learn.
          </p>
          <p>
            💡 Through my travels, I have come to the conclusion that volunteering is the best way to see the world as a traveler and not just a tourist. It allows me to give back to the local community while learning their ways. I have volunteered at local festivals like PianoCity Milano and FESCAAAL film festival, as well as expos like Expo2015 Milano and Expo2017 Astana. I've also volunteered at World Cups/Olympics/Pan Am Games such as Sochi2014 Winter Olympics, Toronto Pan Am Games 2015, Rio2016 Summer Olympics, and Russia2018 World Cup. Additionally, I help local associations get visibility, such as VIVAIO and Milano Città Stato, and organize Engineering competitions in University like EBEC MILANO at Polimi.
          </p>
          <p>
            💻 I'm excited to see what the world has to offer and to continue to learn and grow through my travels and volunteer work!
          </p>
        </div>
      );
}
export default About;