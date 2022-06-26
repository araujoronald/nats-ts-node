export const Teams = [
    'Bahia',
    'Real Madrid',
    'Barcelona',
    'PSG',
    'Liverpool',
    'Chelsea',
    'Manchester City'
]

export const Stadiums = [
    'Fonte Nova',
    'Santiago Bernadeu',
    'Camp Nou',
    'Parc des Princes',
    'Anfield',
    'Stamford Bridge',
    'Etihad Stadium'
]

declare global {
    interface Array<T> {
        sample(): T
    }
}

Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}