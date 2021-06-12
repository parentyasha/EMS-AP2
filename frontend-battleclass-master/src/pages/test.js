import React, { useEffect } from 'react';

import akali from '../assets/icons/akali.png';
import akame from '../assets/icons/akame.png';
import alerquina from '../assets/icons/alequina.png';
import allMight from '../assets/icons/allMight.png';
import capitaoAmerica from '../assets/icons/capitaoAmerica.png';
import darthVader from '../assets/icons/darthVader.png';
import erza from '../assets/icons/erza.png';
import finn from '../assets/icons/finn.png';
import gon from '../assets/icons/gon.png';
import gumball from '../assets/icons/gumball.png';
import hela from '../assets/icons/hela.png';
import hisoka from '../assets/icons/hisoka.png';
import joker from '../assets/icons/joker.png';
import jujuba from '../assets/icons/jujuba.png';
import katarina from '../assets/icons/katarina.png';
import killua from '../assets/icons/killua.png';
import luffy from '../assets/icons/luffy.png';
import midorya from '../assets/icons/midorya.png';
import mordekai from '../assets/icons/mordekai.png';
import mulherGaviao from '../assets/icons/mulherGaviao.png';
import raven from '../assets/icons/raven.png';
import saitama from '../assets/icons/saitama.png';
import shinobu from '../assets/icons/shinobu.png';
import syndra from '../assets/icons/syndra.png';
import tajiro from '../assets/icons/tajiro.png';
import thanos from '../assets/icons/thanos.png';
import thor from '../assets/icons/thor.png';
import wonderWoman from '../assets/icons/wonderWoman.png';
import zanitsu from '../assets/icons/zanitsu.png';
import kirito from '../assets/icons/jv.png';
import ed from '../assets/icons/manel.png';
import cebolinha from '../assets/icons/andre.png';
import patolinoMago from '../assets/icons/patolinoMago.png';
import avengers from '../assets/icons/avengers.png';
import justice from '../assets/icons/justice.png';
import xmen from '../assets/icons/xmen.png';
import titans from '../assets/icons/titans.png';
import rangers from '../assets/icons/rangers.png';


import api from '../service/api';


export default function Test() {

    const heros = [
        //{ nomePersonagem:'Akali', url: akali},
        //{ nomePersonagem:'Akame', url:akame},
        //{ nomePersonagem:'Alerquina', url:alerquina},
        //{ nomePersonagem:'All Might', url:allMight},
        //{ nomePersonagem:'Capitão América', url:capitaoAmerica},
        //{ nomePersonagem:'Darth Vader', url:darthVader},
        //{ nomePersonagem:'Erza Scarlet', url:erza},
        //{ nomePersonagem:'Finn', url:finn},
        //{ nomePersonagem:'Gon Freecss', url:gon},
        //{ nomePersonagem:'Gumball Watterson', url:gumball},
        //{ nomePersonagem:'Hela', url:hela},
        //{ nomePersonagem:'Hisoka', url:hisoka},
        //{ nomePersonagem:'Joker', url:joker},
        //{ nomePersonagem:'Princesa Jujuba', url:jujuba},
        //{ nomePersonagem:'Katarina', url:katarina},
        //{ nomePersonagem:'Killua Zaoldyeck', url:killua},
        //{ nomePersonagem:'Monkey D. Luffy', url:luffy},
        //{ nomePersonagem:'Izuku Midorita', url:midorya},
        //{ nomePersonagem:'Mordekai', url:mordekai},
        //{ nomePersonagem:'Mulher Gavião', url:mulherGaviao },
        //{ nomePersonagem:'Ravena', url:raven },
        //{ nomePersonagem:'Saitama', url:saitama },
        //{ nomePersonagem:'Shinobu Kocho', url:shinobu},
        //{ nomePersonagem:'Syndra', url:syndra},
        //{ nomePersonagem:'Tanjirou Kamado', url:tajiro },
        //{ nomePersonagem:'Thanos', url:thanos},
        //{ nomePersonagem:'Thor', url:thor },
        //{ nomePersonagem:'Mulher Maravilha', url:wonderWoman },
        //{ nomePersonagem:'Zenitsu Agatsuma', url:zanitsu },
        //{ nomePersonagem:'Kirito', url: kirito},
        //{ nomePersonagem:'Edward Elric', url:ed},
        //{ nomePersonagem:'Cebolinha', url:cebolinha},
        //{ nomePersonagem:'O Mago', url:patolinoMago },
        { nomePersonagem:'The Avengers', url:avengers },
        { nomePersonagem:'Justice League', url: justice},
        { nomePersonagem:'Power Rangers', url:rangers},
        { nomePersonagem:'Teen Titans', url:titans},
        { nomePersonagem:'X-Men', url:xmen },
    
    ]

    useEffect(() => {
        async function salvarIcons(){
            var cont = 34
            for (let h in heros){
                await api.post('/icon', {
                    id: cont,
                    nomePersonagem: heros[h].nomePersonagem,
                    url: heros[h].url,
                })
                cont += 1;
                console.log(heros[h])
            }
        }
        salvarIcons();
        console.log('finalizado!!!!')
    },[]);

    return(
        <div>Executado</div>
    );
}