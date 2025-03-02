'use client'

import PracticeBottomNav from '@/components/PracticeBottomNavigation'
import { Button } from '@/components/ui/button'
import { letters } from '@/lib/const'
import { openDatabase } from '@/lib/db'
import { getNextLetter, getPrevLetter } from '@/lib/utils'
import { Trash2, Undo2 } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'

export default function PracticePage() {
  const { type, letter } = useParams<{ type: string, letter: string }>();

  const letterObj = letters[type].find(o => o.kana === decodeURIComponent(letter));

  if (!letterObj) {
    notFound();
  }

  const canvasRef = useRef<CanvasDraw>(null);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const initialLoaded = useRef(false);

  const letterIndex = letters[type].findIndex(o => o.kana === decodeURIComponent(letter))
  const nextLetter = getNextLetter(type, letterIndex)
  const prevLetter = getPrevLetter(type, letterIndex)

  const parsedCanvasData: Record<string, unknown> | null = canvasData ? JSON.parse(canvasData) : null;
  const lines = (parsedCanvasData?.lines as unknown[]) ?? []
  const undoDisabled = lines.length === 0;

  useEffect(() => {
    if (!canvasData || !initialLoaded.current) {
      return;
    }
    // Save practiced letter to IndexedDB
    const savePracticedLetter = async () => {
      const db = await openDatabase()
      const transaction = db.transaction(['practicedLetters'], 'readwrite')
      const store = transaction.objectStore('practicedLetters')
      const request = store.put({
        letter,
        type,
        canvasData,
        timestamp: new Date(),
      });
      request.onerror = () => {
        console.error('Failed to save practiced letter');
      };
    }
    savePracticedLetter();
  }, [canvasData, letter, type]);

  useEffect(() => {
    // Load practiced letter from IndexedDB
    const loadPracticedLetter = async () => {
      const db = await openDatabase()
      const transaction = db.transaction(['practicedLetters'], 'readonly')
      const store = transaction.objectStore('practicedLetters')
      const request = store.get(letter)
      request.onsuccess = () => {
        if (request.result && !initialLoaded.current) {
          canvasRef?.current?.loadSaveData(request.result.canvasData as string);
        }
        initialLoaded.current = true;
      }
    }
    loadPracticedLetter();
  }, [letter]);

  return (
    <Fragment>
      <hr className="bg-gray-50" />
      <main className="container mx-auto">
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">
            Practice {decodeURIComponent(letter)}
          </h1>
          <div className='w-full flex gap-8 mb-8 flex-wrap justify-center'>
            <div>
              <video
                className='size-[400px] border border-gray-300'
                width="400"
                height="400"
                controls
                autoPlay
                muted
              >
                <source
                  src={`/videos/${type}/${letterObj?.pronunciation}.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='flex flex-col'>
              <CanvasDraw
                ref={(canvasDraw) => {
                  canvasRef.current = canvasDraw;
                }}
                className="border border-gray-300"
                brushColor="black"
                brushRadius={4}
                lazyRadius={0}
                canvasHeight={400}
                canvasWidth={400}
                gridSizeX={220}
                gridSizeY={220}
                gridColor='rgb(0, 0, 0, 0.5)'
                onChange={(canvasDraw) => setCanvasData(canvasDraw.getSaveData())}
              />
              <div>
                <Button
                  variant='ghost'
                  size='icon'
                  disabled={undoDisabled}
                  title='Undo'
                  onClick={() => canvasRef.current?.undo()}
                >
                  <Undo2 />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  disabled={undoDisabled}
                  title='Erase all'
                  /* @ts-expect-error: Type error */
                  onClick={() => canvasRef.current?.eraseAll()}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
          <hr className='my-4 bg-gray-50 w-full' />
          <PracticeBottomNav type={type} next={nextLetter} prev={prevLetter} />
        </div>
      </main>
    </Fragment>
  )
}
