import express from "express"
import morgan from "morgan"
import projectRoute from "./routes/project.routes.js"
import userRoute from "./routes/user.routes.js"
import taskRoute from "./routes/task.routes.js"
import cors from "cors"

const server = express()

server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use("/api/projects", projectRoute)
server.use("/api/users", userRoute)
server.use("/api/tasks", taskRoute)

export default server;