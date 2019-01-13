class Nfa {
    constructor(states, currentStates, finalStates, alphabets, delta) {
        this.states = states;
        this.currentState = currentStates;
        this.finalStates = finalStates;
        this.alphabets = alphabets;
        this.delta = delta;
    }

    next(currentState, input) {
        let stateByInput = getOrElse(this.delta[currentState],input,[]);
        let statesByEpsilon = stateByInput.flatMap((state) => this.coexistingStates(state));
        return stateByInput.concat(statesByEpsilon);
    }

    coexistingStates(state, exclude = '') {
        let statesByEpsilon = getOrElse(this.delta[state],'e',[]).filter((stateByEpsilon) => stateByEpsilon !== exclude);
        let connectedTo = statesByEpsilon.flatMap((stateByEpsilon) => this.coexistingStates.call(this,stateByEpsilon,state));
        connectedTo.unshift(state);
        return connectedTo;
    }

    doesAccept(string) {
        let finalStates = string.replace(/'*'/g, '').split('').reduce((currentStates, input) => {
            return currentStates.flatMap((currentState) => this.next(currentState, input))
        }, this.coexistingStates(this.currentState));
        return finalStates.some((finalState) => this.finalStates.includes(finalState));
    }

    static getInstance(tuple) {
        return new Nfa(tuple.states, tuple['start-state'], tuple['final-states'], tuple.alphabets, tuple.delta);
    }
}

const getOrElse = function(keyVal,key,defaultVal) {
    if(keyVal === undefined) return defaultVal;
    return keyVal[key] || defaultVal;
};

module.exports = Nfa;