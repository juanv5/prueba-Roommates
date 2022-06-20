const http = require("http")
const fs = require("fs")
const axios = require("axios")
const { v4: uuidv4 } = require('uuid')

http.createServer((req, res) => {
    if (req.url == "/" && req.method == "GET") {
        res.setHeader("content-type", "text/html")
        res.end(fs.readFileSync("index.html"))
    }
}).listen(3000, console.log("Server ON"))

const nuevoRoommate = async() => {
    try {
        const { data } = await axios.get("https://randomuser.me/api/")
        const roommate = data.results[0]
        const user = {
            id: uuidv4().slice(30),
            nombre: `${roommate.name.title} ${roommate.name.first} ${roommate.name.last}`
        }
        return user
    } catch (error) {
        throw error
    }
}

const guardarRoommate = (roommate) => {
    const roommatesJSON = JSON.parse(fs.readFileSync("roommates.json", "utf8"))
    roommatesJSON.roommates.push(roommate)
    fs.writeFileSync("roommates.json", JSON.stringify(roommatesJSON))
}

module.exports = { nuevoRoommate, guardarRoommate }