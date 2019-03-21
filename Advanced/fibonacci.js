// The fibonacci sequence is the sequence where each number is the sum of its two predecessors.
function fibo () {
  var previous = 0
  var current = 1

  function nacci () {
    console.log(current)
    var temp = previous // 0
    previous = current // 1
    current = previous + temp; // 0+1
  }
  return nacci
}
var fiboCounter = fibo()
fiboCounter(); // should console.log "1"
fiboCounter(); // should console.log "1"
fiboCounter(); // should console.log "2"
fiboCounter(); // should console.log "3"
fiboCounter(); // should console.log "5"
fiboCounter(); // should console.log "8"
