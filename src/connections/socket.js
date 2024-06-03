import io from 'socket.io-client'

const URL = ''

const socket = io('http://localhost:3000/')

var mySocketId

socket.on('createNewGame', statusUpdate => {
    mySocketId=statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}