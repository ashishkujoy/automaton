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
        assert.isFalse(Dfa.getInstance(tuple).doesAccept(''),"Should not accept empty string");
    });

    it('should accept odd number of zeros', function() {
        assert.isTrue(Dfa.getInstance(tuple).doesAccept('0'),"0 is valid");
        assert.isTrue(Dfa.getInstance(tuple).doesAccept('000'),"000 is valid");
    });

    it('should reject even number of zeros', function() {
        assert.isFalse(Dfa.getInstance(tuple).doesAccept('00'),"00 is invalid input");
        assert.isFalse(Dfa.getInstance(tuple).doesAccept('0000'),"0000 is invalid input");
    })
});