class Nfa {
    constructor(states, currentStates, finalStates, alphabets, delta) {
        this.states = states;
        this.currentState = currentStates;
        this.finalStates = finalStates;
        this.alphabets = alphabets;
        this.delta = delta;
    }

    static getInstance(tuple) {
        return new Nfa(tuple.states, tuple['start-state'], tuple['final-states'], tuple.alphabets, tuple.delta);
    }

    next(currentState, input) {
        let stateByInput = getOrElse(this.delta[currentState], input, []);
        let statesByEpsilon = stateByInput.flatMap((state) => this.coexistingStates(state));
        return stateByInput.concat(statesByEpsilon);
    }

    coexistingStates(state, excluded = ['']) {
        let statesByEpsilon = this.epsilonStatesOf(state).filter((stateByEpsilon) => !excluded.includes(stateByEpsilon));
        let connectedTo = statesByEpsilon.flatMap((stateByEpsilon) => this.coexistingStates.call(this, stateByEpsilon, excluded.concat([state])));
        connectedTo.unshift(state);
        return connectedTo;
    }

    doesAccept(string) {
        let inputs = this.normalLiseInput(string);
        if (this.hasInvalidInput(inputs)) return false;
        let finalStates = inputs.reduce((currentStates, input) => {
            return currentStates.flatMap((currentState) => this.next(currentState, input))
        }, this.coexistingStates(this.currentState));
        return this.hasStableState(finalStates);
    }

    hasInvalidInput(inputs) {
        return inputs.some((input) => !this.alphabets.includes(input));
    }

    normalLiseInput(input) {
        return input.replace(/'*'/g, '').split('');
    }

    hasStableState(states) {
        return states.some((finalState) => this.finalStates.includes(finalState));
    }

    epsilonStatesOf(state) {
        return getOrElse(this.delta[state], 'e', []);
    }

}

const getOrElse = function (keyVal, key, defaultVal) {
    if (keyVal === undefined) return defaultVal;
    return keyVal[key] || defaultVal;
};

module.exports = Nfa;