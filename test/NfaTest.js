const chai = require('chai');
const assert = chai.assert;
const Nfa = require('../src/Nfa.js');

describe('Nfa', function() {
    const tuple = {
        states: ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
        alphabets: ['1', '0'],
        delta: {
            q1: { e: ['q2', 'q5'] },
            q2: { '0': ['q3'] },
            q3: { '1': ['q4'] },
            q4: { '0': ['q3'] },
            q5: { '1': ['q6'] },
            q6: { '0': ['q7'] },
            q7: { '1': ['q6'] }
        },
        'start-state': 'q1',
        'final-states': ['q3', 'q6']
    };
    const nfa = Nfa.getInstance(tuple);

    it('should accept 0', function() {
        assert.isTrue(nfa.doesAccept('0'),'0 should be valid input');
    });

    it('should reject 10',function(){
        assert.isFalse(nfa.doesAccept('10'),'10 should be invalid input');
    });

    it('should reject input containing invalid alphabet',function () {
        assert.isFalse(nfa.doesAccept('0a10'));
    });

    describe('coexistingStates', function() {

        it('should give coexistingStates without excluding any state', function() {
            let nfa = Nfa.getInstance(tuple);
            let coexistingStates = nfa.coexistingStates('q1');
            assert.sameMembers(coexistingStates,['q1','q2','q5']);
        });

        it('should give coexistingStates excluding given state', function() {
            let nfa = Nfa.getInstance(tuple);
            let coexistingStates = nfa.coexistingStates('q1','q2');
            assert.sameMembers(coexistingStates,['q1','q5']);
        });

        it('should give coexistingStates for nesting coexistence',function () {
            let tuple = {
                "states": [
                    "q1",
                    "q3",
                    "q9",
                    "q7",
                    "q2",
                    "q8",
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
                            "q4"
                        ]
                    },
                    "q3": {
                        "0": [
                            "q3"
                        ]
                    },
                    "q9": {
                        "e": [
                            "q7"
                        ]
                    },
                    "q7": {
                        "1": [
                            "q8"
                        ],
                        "e": [
                            "q9"
                        ]
                    },
                    "q2": {
                        "0": [
                            "q3"
                        ]
                    },
                    "q8": {
                        "0": [
                            "q9"
                        ]
                    },
                    "q5": {
                        "1": [
                            "q6"
                        ]
                    },
                    "q6": {
                        "e": [
                            "q7",
                            "q4"
                        ]
                    },
                    "q4": {
                        "0": [
                            "q5"
                        ],
                        "e": [
                            "q6"
                        ]
                    }
                },
                "start-state": "q1",
                "final-states": [
                    "q3",
                    "q9",
                    "q6"
                ]
            };
            let nfa = Nfa.getInstance(tuple);
            let coexistingStates = nfa.coexistingStates('q1');
            assert.sameMembers(coexistingStates,['q1','q2','q4','q6','q7','q9']);
        });
    });
});