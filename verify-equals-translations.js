let equal = require("deep-equal");
// The verifyEquals function checks that two values contain equivalent data. Whereas === only works for primitives, verifyEquals also works for objects (including arrays).
let verifyEquals = (a, b) => {
  if (!equal(a, b)) {
    throw new Error("Equality test failed");
  }
};
module.exports = verifyEquals;
