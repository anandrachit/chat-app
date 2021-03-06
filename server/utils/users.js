class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {
            id, 
            name, 
            room
        }
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let user = this.getUser(id);
        if(user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id){
        return this.users.filter(user => user.id === id)[0];
    }

    getUsersList(room){
        let userList = this.users.filter(user => user.room === room);
        let namesArray = userList.map(user => user.name);

        return namesArray;
    }

    getRoomList(){
        let roomArray = this.users.map(user => user.room);

        return roomArray;
    }
}

module.exports = {
    Users
}