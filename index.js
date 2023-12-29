const {eventLoopUtilization} = require('perf_hooks').performance
let lastELU = eventLoopUtilization()

setInterval(() => {
    // Store the current ELU to assigned later
    const tmpELU = eventLoopUtilization()
    // Calculate the diff between the current and last before sending
    someExternalcollector(eventLoopUtilization(tmpELU, lastELU))
    // Assign over the last value to report the next interval
    lastELU = tmpELU
}, 100);