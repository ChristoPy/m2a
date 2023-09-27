const instructions = []
const vars = {}

function $var([name, value]) {
  vars[name] = value
}
function $sum([name, amount]) {
  vars[name] += amount
}

const supported = {
  '$var': $var,
  '$sum': $sum,
}

function getInstructionFunctionOrDie(instruction) {
  const instructionFunction = supported[instruction]

  if (!instructionFunction) {
    console.error(`Unsuported instruction`)
    process.exit(1)
  }

  return instructionFunction
}

function run() {
  for (const instruction of instructions) {
    const instructionFunction = getInstructionFunctionOrDie(instruction[0])
    instructionFunction(instruction[1])
  }
}

function add(instruction, params) {
  getInstructionFunctionOrDie(instruction)
  instructions.push([instruction, params])
}

add("$var", ["test", 0])
add("$sum", ["test", 1])
run()
console.log(vars)
