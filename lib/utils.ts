import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { letters } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPrevLetter(type: string, letterIndex: number) {
  let prevLetter = ''
  let tempLetterIndex = letterIndex
  while (prevLetter === '' && tempLetterIndex >= 0) {
    prevLetter = letterIndex > 0 ? letters[type][tempLetterIndex - 1].kana : null
    tempLetterIndex--
  }
  return prevLetter
}

export function getNextLetter(type: string, letterIndex: number) {
  let nextLetter = ''
  let tempLetterIndex = letterIndex
  while (nextLetter === '' && tempLetterIndex < letters[type].length) {
    nextLetter = letterIndex < letters[type].length - 1 ? letters[type][tempLetterIndex + 1].kana : null
    tempLetterIndex++
  }
  return nextLetter
}
