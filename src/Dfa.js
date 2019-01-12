class Dfa {
    constructor() {}

    static getInstance(tuple) {
        return new Dfa();
    }

    doesAccept(string) {
        return false;
    }
}

module.exports = Dfa;