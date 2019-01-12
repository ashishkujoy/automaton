// states: ['q1', 'q2'],
//     alphabets: ['1', '0'],
//     delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
//     'start-state': 'q1',
//     'final-states': ['q2']

class Dfa {
    constructor(states,currentState,finalStates,alphabets,delta) {
        this.states = states;
        this.currentState = currentState;
        this.finalStates = finalStates;
        this.alphabets = alphabets;
        this.delta = delta;
    }

    static getInstance(tuple) {
        return new Dfa(tuple.states, tuple['start-state'],tuple['final-states'],tuple.alphabets,tuple.delta);
    }

    doesAccept(string) {
        string.split('').forEach(input => {
            let nextState = this.delta[this.currentState][input];
            this.currentState = nextState;
        });
        return this.finalStates.includes(this.currentState);
    }
}

module.exports = Dfa;