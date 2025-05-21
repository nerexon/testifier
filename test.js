const { Assertion, test, assert, testAll } = require("./src/index");

// Grouping tests for clarity
console.log("Running Tests...\n");

// Truthy and Falsy Tests
test("Test 1: Should confirm true is true", () => {
    assert(true).toBeTrue();
});

test("Test 2: Should confirm false is false", () => {
    assert(false).toBeFalse();
});

test("Test 3: Should confirm undefined is undefined", () => {
    assert(undefined).toBeUndefined();
});

test("Test 4: Should confirm null is null", () => {
    assert(null).toBeNull();
});

// Negation Tests
test("Test 5: Should confirm false is not true", () => {
    assert(false).not().toBeTrue();
});

// Failure Tests
test("Test 6: Should fail when asserting true is false", () => {
    assert(true).toBeFalse();
});

// Additional Tests
test("Test 7: Should confirm 1 is truthy", () => {
    assert(1).not().toBeFalse();
});

test("Test 8: Should confirm 0 is falsy", () => {
    assert(0).toFail();
});

// Summary of Test Results
const allPassed = testAll();
console.log(`\nAll tests passed: ${allPassed}`);
