


export const getRandomNumber = () => {
    const roll = Math.random();
    
    if (roll < 0.33) {
        // 33% chance: number from 1-10
        return Math.floor(Math.random() * 10) + 1;
    } else if (roll < 0.66) {
        // 33% chance: number from 11-100
        return Math.floor(Math.random() * 90) + 11;
    } else {
        // 33% chance: number from 101-9999
        return Math.floor(Math.random() * 9899) + 101;
    }
}