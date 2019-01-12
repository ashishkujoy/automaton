const chai = require('chai');
const Dfa = require('../src/Dfa.js');
const assert = chai.assert;
const Nfa = require('../src/Nfa.js');

describe('Nfa', function() {
    const tuple = {
        states: ['q1', 'q2'],
        alphabets: ['1', '0'],
        delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
        'start-state': 'q1',
        'final-states': ['q2']
      };

    it('should accept 0', function() {
        let nfa = Nfa.getInstance(tuple);
        assert.isTrue(nfa.doesAccept('0'),'0 should be valid input');
    });
});