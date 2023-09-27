const instructions = []
const vars = {}

function resolveValue(nameOrValue) {
  if (typeof nameOrValue === 'number') return nameOrValue
  return vars[nameOrValue] // it can be undefined and fuck up the runtime, fix it later
}

function $var([name, value]) {
  vars[name] = resolveValue(value)
}
function $add([name, value]) {
  vars[name] += resolveValue(value)
}
function $subtract([name, value]) {
  vars[name] -= resolveValue(value)
}
function $divide([name, value]) {
  vars[name] /= resolveValue(value)
}
function $multiply([name, value]) {
  vars[name] *= resolveValue(value)
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

add("$var", ["test1", "test"])
add("$add", ["test1", "test"])
add("$div", ["test1", "test"])
add("$mul", ["test1", "test"])
add("$sub", ["test1", "test"])
run()
console.log(vars)
