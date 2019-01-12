class Nfa {
    constructor() {}

    doesAccept(string) {
        return true;
    }

    static getInstance(tuple) {
        return new Nfa();
    }
}

module.exports = Nfa;