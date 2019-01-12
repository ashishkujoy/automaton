const chai = require('chai');
const Dfa = require('../src/Dfa.js');
const assert = chai.assert;

describe('Dfa', function() {
    let tuple = {
        states: ['q1', 'q2'],
        alphabets: ['1', '0'],
        delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
        'start-state': 'q1',
        'final-states': ['q2']
    };

    it('should reject empty string', function () {
        const dfa = Dfa.getInstance(tuple);
        assert.isFalse(dfa.doesAccept(''),"Should not accept empty string");
    })
});