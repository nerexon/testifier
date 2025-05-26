/**
 * A simple unit test module
 */

let tests = [];

/**
 * 
 * @param {string} name The name of the test
 * @param {function test()} callback The content of the test
 */
function test(name, callback) {
    tests.push({ name, callback });
}

/**
 * Assertion class for fluent assertion methods.
 */
class Assertion {
    /**
     * 
     * @param {*} actual Can be anything, we'll test it after
     */
    constructor(actual) {
        this.actual = actual;
        this.isNegated = false; // Flag to track negation
    }

    /**
     * Negate the assertion
     */
    not() {
        this.isNegated = true;
        return this; // Return the instance for chaining
    }

    /**
     * Check if the assertion is true
     */
    toBeTrue() {
        this._checkAssertion(this.actual === true, 'true');
    }

    /**
     * Check if the assertion is false
     */
    toBeFalse() {
        this._checkAssertion(this.actual === false, 'false');
    }

    /**
     * Check if the assertion is undefined
     */
    toBeUndefined() {
        this._checkAssertion(this.actual === undefined, 'undefined');
    }

    /**
     * Check if the assertion is null
     */
    toBeNull() {
        this._checkAssertion(this.actual === null, 'null');
    }

    /**
     * Check if the assertion fails
     */
    toFail() {
        this._checkAssertion(!this.actual, 'falsy value');
    }

    /**
     * Check if the assertion is equal
     * @param {any} valid What you want to compare it with
     */
    toBeEqualTo(valid) {
        this._checkAssertion(this.actual == valid, 'equal')
    }

    /**
     * Check if the assertion is equal
     * @param {any} valid What you want to compare it with
     */
    toBeStrictlyEqualTo(valid) {
        this._checkAssertion(this.actual === valid, 'strictly equal')
    }

    /**
     * Helper method to check assertions
     * @param {boolean} condition - The condition to check
     * @param {string} expected - The expected value description
     */
    _checkAssertion(condition, expected) {
        if (this.isNegated ? condition : !condition) {
            throw new Error(`Expected to be ${this.isNegated ? 'not ' : ''}${expected}, but got ${this.actual}`);
        }
    }
}

/**
 * Helper function to create Assertion instances
 * @param {*} actual - The actual value to assert
 * @returns {Assertion}
 */
function assert(actual) {
    return new Assertion(actual);
}

/**
 * Execute all tests
 * @returns {boolean} If all tests succeed or not
 */
function testAll() {
    let allTestsPassed = true; // Flag to track if all tests pass
    let results = []; // Array to store results of each test

    for (const { name, callback } of tests) {
        try {
            callback(); // Execute the test callback
            results.push({ name, status: 'passed' });
        } catch (error) {
            allTestsPassed = false; // If an error occurs, set the flag to false
            results.push({ name, status: 'failed', error: error.message });
        }
    }

    // Output the results with colored text using ANSI escape codes
    results.forEach(result => {
        if (result.status === 'passed') {
            // Green color for passed tests
            console.log(`\x1b[32mTest "${result.name}": PASSED\x1b[0m`);
        } else {
            // Red color for failed tests
            console.log(`\x1b[31mTest "${result.name}": FAILED - ${result.error}\x1b[0m`);
        }
    });

    return allTestsPassed; // Return true if all tests passed, false otherwise
}

module.exports = { Assertion, test, assert, testAll };

