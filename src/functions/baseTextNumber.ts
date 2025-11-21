import { sampleTexts } from "../data/texts"





export const baseTextNumberGenerator = () => {
    return Math.floor(Math.random() * sampleTexts.length)
}