import { nextTick } from '../util/index'

let queue = []
let queued = false

/**
 * Push a job into the queue.
 *
 * @param {Function} job
 */

export function queueReflow (job) {
  queue.push(job)
  if (!queued) {
    queued = true
    nextTick(flush)
  }
}

/**
 * Flush the queue, and do one forced reflow before
 * triggering transitions.
 */

function flush () {
  // Force layout
  /* eslint-disable no-unused-vars */
  var f = document.documentElement.offsetHeight
  /* eslint-enable no-unused-vars */
  for (var i = 0; i < queue.length; i++) {
    queue[i]()
  }
  queue = []
  queued = false
}
