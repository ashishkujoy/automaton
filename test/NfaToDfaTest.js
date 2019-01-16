const assert = require('chai').assert;
const {combineWithNElements, nfaToDfaStates} = require('../src/NfaToDfa');


describe('NfaToDfa helper functions', function () {

    describe('combineWithNElements', function () {
        let testCases = [
            {combinator: 1, input: [2, 3, 4], output: [[1, 2], [1, 3], [1, 4]], size: 1},
            {combinator: 1, input: [2, 3, 4], output: [[1, 2, 3], [1, 3, 4]], size: 2},
            {combinator: 1, input: [2, 3, 4], output: [[1, 2, 3, 4]], size: 3},
            {combinator: 1, input: [2, 3, 4], output: [], size: 4},
        ];

        testCases.forEach(function (testCase) {
            let {combinator, input, output, size} = testCase;
            it(`should give combinations of ${combinator} with ${size} other elements from [${input}]`, function () {
                assert.sameDeepMembers(combineWithNElements(combinator, size, input), output);
            })
        })
    });

    describe('nfaToDfaStates', function () {
        let testCases = [
            {
                input: [],
                output: ['q0']
            },
            {
                input: ['q1', 'q2'],
                output: ['q0', 'q1', 'q2', ['q1', 'q2']]
            },
            {
                input: ['q1', 'q2', 'q3'],
                output: ['q0', 'q1', 'q2', 'q3', ['q1', 'q2'], ['q1', 'q3'], ['q1', 'q2', 'q3'], ['q2', 'q3']]
            },
            {
                input: ['q1', 'q2', 'q3', 'q4'],
                output: ['q0', 'q1', 'q2', 'q3', 'q4',
                    ['q1', 'q2'], ['q1', 'q3'], ['q1', 'q4'], ['q1', 'q2', 'q3'], ['q1', 'q3', 'q4'], ['q1', 'q2', 'q3', 'q4'],
                    ['q2', 'q3'], ['q2', 'q4'], ['q2', 'q3', 'q4'],
                    ['q3', 'q4']
                ]
            }
        ];

        testCases.forEach(function (testCase) {
            it(`should give combination of ${testCase.input}`, function () {
                assert.sameDeepMembers(nfaToDfaStates(testCase.input), testCase.output);
            });
        });
    });

});
