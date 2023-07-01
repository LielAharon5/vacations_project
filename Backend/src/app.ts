import cors from "cors"
import express from "express"
import appConfig from "./2-utils/app-config"
import catchAll from "./3-middleware/catch-all"
import routeNotFound from "./3-middleware/route-not-found"
import authController from "./6-controllers/auth-contoller"
import vacationController from "./6-controllers/vacation-controller"
import expressFileUpload from "express-fileupload"
import sanitize from "./3-middleware/sanitize";
import expressRateLimit from "express-rate-limit"


const server = express()

server.use("/api/", expressRateLimit({
    max: 1,
    windowMs: 1000
}))

server.use(cors({origin: appConfig.frontEndUrl}))
server.use(expressFileUpload())

server.use(express.json())
server.use(sanitize)
server.use("/api",authController)
server.use("/api",vacationController)
server.use("*",routeNotFound)
server.use(catchAll)

server.listen(appConfig.port, ()=> console.log(`Listening on http://localhost:${appConfig.port}`))


