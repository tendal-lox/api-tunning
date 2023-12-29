import fastify from 'fastify'
import underPressure from '@fastify/under-pressure'
import {setTimeout as sleep} from 'timers/promises'
import atomicSleep from 'atomic-sleep'

const server = fastify()

server.register(underPressure, {
    maxEventLoopDelay: 200,
    maxEventLoopUtilization: 0.90,

    // Do nothing, let the request go through normally
    pressureHandler: (req, rep) => {}
})

server.get('/', async (req, reply) => {
    //Simulate a database query
    await sleep(10)

    if (!server.isUnderPressure()) {
        //Simulate some synchronous work
        atomicSleep(20)
    } else {
        //Use cached value
    }

    return 'Hello world'
})

await server.listen({port: 3000})