import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Letter, letters } from './const';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPrevLetter(type: string, letterIndex: number) {
  let prevLetter: Letter = { kana: '', pronunciation: '' };
  let tempLetterIndex = letterIndex
  while (prevLetter.kana === '' && tempLetterIndex >= 0) {
    prevLetter = letterIndex > 0 ? letters[type][tempLetterIndex - 1] : { kana: '', pronunciation: '' }
    tempLetterIndex--
  }
  return prevLetter
}

export function getNextLetter(type: string, letterIndex: number) {
  let nextLetter: Letter = { kana: '', pronunciation: '' };
  let tempLetterIndex = letterIndex
  while (nextLetter.kana === '' && tempLetterIndex < letters[type].length) {
    nextLetter = letterIndex < letters[type].length - 1 ? letters[type][tempLetterIndex + 1] : { kana: '', pronunciation: '' }
    tempLetterIndex++
  }
  return nextLetter
}
