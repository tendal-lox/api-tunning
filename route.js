import {setTimeout as sleep} from 'timers/promises'
import atomicSleep from 'atomic-sleep'

export default async (app) => {
    app.get('/', async (req, reply) => {
        //Simulate a database query
        // await sleep(10)

        await new Promise((res, rej) => {
            setTimeout(() => {
                // do something
                res()
            }, 10);
        })

        //Simulate some synchronous work
        atomicSleep(20)

        return 'Hello world'
    })
}