import React, {useState} from 'react';
import "./board.css";



function direction(x,y){
    let directions = ['N','E','S','W'];

    // if(x===1){
    //     directions = directions.filter(direction => direction !== 'W')
    // }

    // if(x===5){
    //     directions = directions.filter(direction => direction !== 'E')
    // }

    // if(y===1){
    //     directions = directions.filter(direction => direction !== 'N')
    // }

    // if(y===5){
    //     directions = directions.filter(direction => direction !== 'S')
    // }


    // zufällige Richtung
    function randomDirection(possibleDirections){
        const randomIndex = ~~(Math.random()*possibleDirections.length);
        //console.log(randomIndex);
     return directions[randomIndex]
    }

     let allowedDirections = randomDirection(directions)

     directions = directions.filter(direction => direction !== allowedDirections)


     while (allowedDirections.length < directions.length) {
        const coin = ~~(Math.random()*2)

        if(coin === 1){
            allowedDirections += randomDirection(directions)
        } else {
            return removeDuplicates(allowedDirections)
        }
     } 
     return removeDuplicates(allowedDirections)
        
     
}

// Duplikate entfernen
function removeDuplicates(str){
    let result = str.split('')
    result = new Set(result)
    result = Array.from(result)
    result = result.join('')
    console.log(result);

    return result
}

//////////////////////////////
// Spieler hinzufuegen

export default function Board() {
    const [userX,setuserX] = useState(3);
    const [userY,setuserY] = useState(3);
    
    const user = 'Hans';
    // Row
function makeRow(y) {
    // const Array = [[1,y],[2,y],[3,y]]
    const coordinates = [];
    for (let x =1;x < 6; x++) {
       coordinates.push([x,y]);
        
    }
    return coordinates.map(coordinate => <div 
        datax = {coordinate[0]} 
        className="landscape"
        datay = {coordinate[1]}>
        {direction(coordinate[0], coordinate[1])}
        {((userX === coordinate[0]) && (userY === coordinate[1]))?user:''}
        </div>)
}
// Columns
function makeColumn() {
    const elements = []
    for(let y = 1; y < 6 ; y++) {
        elements.push(<div className='row'>{makeRow(y)}</div>)
    }
    return elements
}

    return(
        <div className='board'>
            {makeColumn()}
        </div>
    );

}