const chai = require('chai');
const Dfa = require('../src/Dfa.js');
const Nfa = require('../src/Nfa');
const fs = require('fs');

const assert = chai.assert;

const testData = JSON.parse(fs.readFileSync('./test/testData.json'));
const nfaData = testData.filter((data) => data.type === 'nfa');
const dfaData = testData.filter((data) => data.type === 'dfa');

describe('Dfa',function () {
   it('should accept valid inputs', function () {
       dfaData.forEach((data) => {
           console.log(`Testing for ${data.name}`);
           let dfa = Dfa.getInstance(data.tuple);
           console.log(`----------Testing for valid inputs----------`);
           data["pass-cases"].forEach((input) => assert.isTrue(dfa.doesAccept(input),`${input} should be valid`));
           console.log(`----------Testing for invalid inputs----------`);
           data["fail-cases"].forEach((input) => assert.isFalse(dfa.doesAccept(input),`${input} should be valid`));
       })
   })
});

describe('Nfa',function () {
    it('should accept valid inputs', function () {
        nfaData.forEach((data) => {
            console.log(`Testing for ${data.name}`);
            let nfa = Nfa.getInstance(data.tuple);
            console.log(`----------Testing for valid inputs----------`);
            data["pass-cases"].forEach((input) => assert.isTrue(nfa.doesAccept(input),`${input} should be valid`));
            console.log(`----------Testing for invalid inputs----------`);
            data["fail-cases"].forEach((input) => assert.isFalse(nfa.doesAccept(input),`${input} should be valid`));
        })
    });

    it('should pass for any number of zeros followed by any number of one',function(){
        let tuple = {
            "states": [
                "q1",
                "q3",
                "q2",
                "q5",
                "q4"
            ],
            "alphabets": [
                "1",
                "0"
            ],
            "delta": {
                "q1": {
                    "e": [
                        "q2",
                        "q4"
                    ]
                },
                "q2": {
                    "0": [
                        "q2"
                    ],
                    "e": [
                        "q3"
                    ]
                },
                "q3": {
                    "1": [
                        "q3"
                    ]
                },
                "q4": {
                    "1": [
                        "q4"
                    ],
                    "e": [
                        "q5"
                    ]
                },
                "q5": {
                    "0": [
                        "q5"
                    ]
                }
            },
            "start-state": "q1",
            "final-states": [
                "q3",
                "q5"
            ]
        };
        let nfa = Nfa.getInstance(tuple);
        assert.isTrue(nfa.doesAccept("0"));
    });

    it('alternate characters beginning and ending with same letter',function () {
        let tuple = {
            "states": [
            "q1",
            "q3",
            "q7",
            "q2",
            "q5",
            "q6",
            "q4"
        ],
            "alphabets": [
            "1",
            "0"
        ],
            "delta": {
            "q1": {
                "e": [
                    "q2",
                    "q5"
                ]
            },
            "q2": {
                "0": [
                    "q3"
                ]
            },
            "q3": {
                "1": [
                    "q4"
                ]
            },
            "q4": {
                "0": [
                    "q3"
                ]
            },
            "q5": {
                "1": [
                    "q6"
                ]
            },
            "q6": {
                "0": [
                    "q7"
                ]
            },
            "q7": {
                "1": [
                    "q6"
                ]
            }
        },
            "start-state": "q1",
            "final-states": [
            "q3",
            "q6"
        ]
        }
        let nfa = Nfa.getInstance(tuple);
        assert.isTrue(nfa.doesAccept("0"));
    })
});