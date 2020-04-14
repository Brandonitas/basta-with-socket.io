
class Answer{
    constructor(){
       this.answers = [];
    }

    addAnswer(char,id,username,room,nombre,color,fruto,objeto,lugar,animal){
        let answer = {
            char,
            id,
            username,
            room,
            nombre,
            color,
            fruto,
            objeto,
            lugar,
            animal
        };
        this.answers.push(answer);
        return answer;
    }

    getAnswerList(room){
        let answer = this.answers.filter((answer) =>answer.room === room);
        //let namesArray = user.map((user) =>user.name);
        return answer;
    }

    /*getUser(id){
        return this.users.filter((user) => user.id ===id)[0];
    }*/

    /*removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => user.id != id);
        }
        return user;
    }*/

}


module.exports = {Answer};