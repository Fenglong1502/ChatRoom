const users =[];

const addUser = ({id, username, roomName}) => {
    username = username.trim().toLowerCase();
    roomName = roomName.trim().toLowerCase();

    const existingUser = users.find((user) => user.roomName === roomName && user.username === username);

    if(existingUser){
        return { error: 'Username is already taken'};
    }

    const user = { id, username, roomName }

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}
const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomName) => users.filter((user) => user.roomName === roomName);

module.exports = { addUser, removeUser, getUser, getUsersInRoom};