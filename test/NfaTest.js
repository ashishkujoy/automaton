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

    it('should accept 0', function() {
        let nfa = Nfa.getInstance(tuple);
        assert.isTrue(nfa.doesAccept('0'),'0 should be valid input');
    });

    it('should reject 10',function(){
        let nfa = Nfa.getInstance(tuple);
        assert.isFalse(nfa.doesAccept('10'),'10 should be invalid input');
    });

    describe('nextStates', function() {
        it('should give q3 and q6 as next state', function() {
            let nfa = Nfa.getInstance(tuple);
            let nextStates = nfa.nextStates('q1','1');
            assert.isTrue(nextStates.includes('q6'));
        })
    });
});