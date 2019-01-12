class Nfa {
    constructor(states, currentStates, finalStates, alphabets, delta) {
        this.states = states;
        this.currentState = currentStates;
        this.finalStates = finalStates;
        this.alphabets = alphabets;
        this.delta = delta;
    }

    getOrElse(keyVal,key,defaultVal) {
        if(keyVal === undefined) return defaultVal;
        return keyVal[key] || defaultVal;
    }

    next(currentState, input) {
        let stateByInput = this.getOrElse(this.delta[currentState],input,[]);
        let statesByEpsilon = stateByInput.flatMap((state) => this.getOrElse(this.delta[state],'e',[]));
        return stateByInput.concat(statesByEpsilon);
    }

    coexistingGroupOf(state) {
        let statesByEpsilon = this.getOrElse(this.delta[state],'e',[]);
        let self = this;
        let connectedTo = statesByEpsilon.flatMap((state) => self.coexistingGroupOf.call(self,state));
        connectedTo.unshift(state);
        return connectedTo;
    }

    doesAccept(string) {
        let self = this;
        let finalStates = string.replace(/'*'/g, '').split('').reduce((currentStates, input) => {
            return currentStates.flatMap((currentState) => {
                let next1 = self.next(currentState,input);
                return next1;
            })
        }, this.coexistingGroupOf(this.currentState));
        return finalStates.some((finalState) => self.finalStates.includes(finalState));
    }

    static getInstance(tuple) {
        return new Nfa(tuple.states, tuple['start-state'], tuple['final-states'], tuple.alphabets, tuple.delta);
    }
}

module.exports = Nfa;