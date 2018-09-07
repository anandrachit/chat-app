const expect = require('expect');

const {Users} = require('./users');
let users =[];
describe('Users class', () => {
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Todd',
            room: 'Payroll'
        },{
            id: 2,
            name: 'Jeniffer',
            room: 'OMCS'
        },{
            id: 3,
            name: 'Kim',
            room: 'Payroll'
        }]
    });
    it('Should Add new user', ()=> {
        let users = new Users();
        let user = {
            id: 123,
            name: 'Rachit',
            room: 'Payroll'
        }

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should return names for Payroll', () => {
        let usersList = ['Todd','Kim']
        let namesArray = users.getUsersList('Payroll');

        expect(namesArray).toEqual(usersList);
    });
    it('Should return names for OMCS', () => {
        let usersList = ['Jeniffer'];
        let namesArray = users.getUsersList('OMCS');

        expect(namesArray).toEqual(usersList);
    });

    it('Should remove a user', () => {
        let userId = 1;
        let user = users.removeUser(userId);

        expect(user).toBeTruthy();
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        let userId = 33;
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () => {
        let userQueried = users.getUser(1);
        expect(userQueried.name).toBe('Todd');
    });

    it('Should not find user', () => {
        let userQueried = users.getUser(123);
        expect(userQueried).toBeFalsy();
    })
});