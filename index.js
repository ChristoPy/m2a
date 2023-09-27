const instructions = []
const vars = {}

function $var([name, value]) {
  vars[name] = value
}
function $add([name, amount]) {
  vars[name] += amount
}
function $subtract([name, amount]) {
  vars[name] -= amount
}
function $divide([name, amount]) {
  vars[name] /= amount
}
function $multiply([name, amount]) {
  vars[name] *= amount
}

const supported = {
  '$var': $var,
  '$add': $add,
  '$sub': $subtract,
  '$div': $divide,
  '$mul': $multiply,
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
add("$add", ["test", 10])
add("$div", ["test", 2])
add("$mul", ["test", 2])
add("$sub", ["test", 5])
run()
console.log(vars)
