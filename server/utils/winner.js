const {isRealString} = require('./isRealString');

class Winner{
    constructor(){
       this.answers = [];
    }

        /*
         let answer = {
            char
            id,
            username,
            room,
            nombre,
            color,
            fruto,
            objeto,
            lugar,
            animal
        };*/
    getWinner(answers){
        let pointUser1 = 0;
        let pointUser2 = 0;
        let char = answers[0].char.toLowerCase();

        let user1 = answers[0];
        let user2 = answers[1];

        if(isRealString(user1.nombre) && user1.nombre.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }

        if(isRealString(user1.color) && user1.color.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }

        if(isRealString(user1.fruto) && user1.fruto.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }

        if(isRealString(user1.objeto) && user1.objeto.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }

        if(isRealString(user1.lugar) && user1.lugar.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }

        if(isRealString(user1.animal) && user1.animal.charAt(0).toLowerCase() == char){
            pointUser1 += 100;
        }


        //Usuario 2

        if(isRealString(user2.nombre) && user2.nombre.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }

        if(isRealString(user2.color) && user2.color.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }

        if(isRealString(user2.fruto) && user2.fruto.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }

        if(isRealString(user2.objeto) && user2.objeto.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }

        if(isRealString(user2.lugar) && user2.lugar.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }

        if(isRealString(user2.animal) && user2.animal.charAt(0).toLowerCase() == char){
            pointUser2 += 100;
        }        


        //Comparamos si tienen las mismas respeustas y restamos 50 puntos
        if(isRealString(user1.nombre) && isRealString(user2.nombre) && (user1.nombre == user2.nombre)){
            console.log("SÍ ENTRE A UNO Y RESTÉ 50");
            pointUser1 -= 50;
            pointUser2 -= 50;
        }

        if(isRealString(user1.color) && isRealString(user2.color) && (user1.color == user2.color)){
            pointUser1 -= 50;
            pointUser2 -= 50;
        }

        if(isRealString(user1.fruto) && isRealString(user2.fruto) && (user1.fruto == user2.fruto)){
            pointUser1 -= 50;
            pointUser2 -= 50;
        }

        if(isRealString(user1.objeto) && isRealString(user2.objeto) && (user1.objeto == user2.objeto)){
            pointUser1 -= 50;
            pointUser2 -= 50;
        }

        if(isRealString(user1.lugar) && isRealString(user2.lugar) && (user1.lugar == user2.lugar)){
            pointUser1 -= 50;
            pointUser2 -= 50;
        }

        if(isRealString(user1.animal) && isRealString(user2.animal) && (user1.animal == user2.animal)){
            pointUser1 -= 50;
            pointUser2 -= 50;
        }
    
        let stringResult = '';
        if(pointUser1 > pointUser2){
            stringResult = "El ganador es "+user1.username+" con "+pointUser1 + " puntos, mientras que "+user2.username+ " solo obtuvo "+ pointUser2+" puntos." 
        }else if(pointUser2 > pointUser1){
            stringResult = "El ganador es "+user2.username+" con "+pointUser2 + " puntos, mientras que "+user1.username+ " solo obtuvo "+ pointUser1+" puntos." 
        }else{
            stringResult = "Empate con " + pointUser1+ " puntos";
        }
        return stringResult;
    }


}


module.exports = {Winner};