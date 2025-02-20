interface Stroke {
  d: string
  duration: number
}

interface StrokeData {
  [key: string]: {
    strokes: Stroke[]
    width: number
    height: number
  }
}

export const strokeData: StrokeData = {
  'あ': {
    strokes: [
      { d: 'M 30 30 C 70 30, 70 70, 30 70', duration: 1000 },
      { d: 'M 50 50 L 80 80', duration: 500 },
      { d: 'M 80 50 L 50 80', duration: 500 }
    ],
    width: 100,
    height: 100
  },
  'ア': {
    strokes: [
      { d: 'M 20 20 L 80 20', duration: 800 },
      { d: 'M 50 20 L 20 80', duration: 800 }
    ],
    width: 100,
    height: 100
  },
  // Add more characters here
}

export function getStrokeData(letter: string) {
  return strokeData[letter] || {
    strokes: [{ d: 'M 0 0 L 100 100', duration: 1000 }],
    width: 100,
    height: 100
  }
}
