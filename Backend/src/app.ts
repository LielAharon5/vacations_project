import cors from "cors"
import express from "express"
import appConfig from "./2-utils/app-config"
import catchAll from "./3-middleware/catch-all"
import routeNotFound from "./3-middleware/route-not-found"
import controller from "./6-controllers/controller"

// Create the server
const server = express()

// Define CORS Policy:
server.use(cors()) // Allow to everyone send me request.

// Define json reading on project
server.use(express.json()) // creates request.body object if exists
server.use("/api",controller)
server.use("*",routeNotFound)
server.use(catchAll)

// Listen on port
server.listen(appConfig.port, ()=> console.log(`Listening on http://localhost:${appConfig.port}`))