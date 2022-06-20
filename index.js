const url = require("url")
const http = require("http")
const fs = require("fs")
const axios = require("axios")
const { v4: uuidv4 } = require("uuid")
const { nuevoRoommate, guardarRoommate } = require("./roommates")


http
    .createServer(function(req, res) {
        if (req.url == "/" && req.method == "GET") {
            res.setHeader("content-type", "text/html")
            res.end(fs.readFileSync("index.html"))
        }

        if (req.url.startsWith("/gastos") && req.method == "GET") {
            const gastosJSON = JSON.parse(fs.readFileSync("gastos.json",
                "utf8"))
            res.end(JSON.stringify(gastosJSON));
        }

        if (req.url.startsWith("/roommates") && req.method == "GET") {
            const data = JSON.parse(fs.readFileSync("roommates.json", "utf8"))
            res.end(JSON.stringify(data));
        }

        if (req.url.startsWith("/roommates") && req.method == "POST") {
            let gastosJSON = JSON.parse(fs.readFileSync("roommates.json",
                "utf8"))
            let gastos = gastosJSON.gastos;
            let body;
            req.on("data", (payload) => {
                body = JSON.parse(payload);
            });
            req.on("end", () => {
                gastos = {
                    id: uuidv4().slice(30),
                    roommate: body.roommate,
                    descripcion: body.descripcion,
                    monto: body.monto,
                };
                gastos.push(gasto);
                fs.writeFileSync("gastos.json",
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }
        if (req.url.startsWith("/gasto") && req.method == "PUT") {
            let body;
            req.on("data", (payload) => {
                body = JSON.parse(payload);
            });

            req.on("end", () => {
                gastosJSON.gastos = gastos.map((b) => {
                    if (b.id == body.id) {
                        return body;
                    }
                    return b;
                });

                fs.writeFileSync("gastos.json",
                    JSON.stringify(gastosJSON));
                res.end();
            });
        }

        if (req.url.startsWith("/gasto") && req.method == "DELETE") {

            const { id } = url.parse(req.url, true).query;

            gastosJSON.gastos = gastos.filter((b) => b.id !== id);

            fs.writeFileSync("gastos.json",
                JSON.stringify(gastosJSON));
            res.end();
        }
    })
    .listen(3000);