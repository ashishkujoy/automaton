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
        let finalState = string.split('').reduce((currentState,input) => {
            return this.delta[currentState][input];
        },this.currentState);

        return this.finalStates.includes(finalState);
    }
}

module.exports = Dfa;