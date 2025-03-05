'use client';

import PracticeBottomNav from '@/components/practice-bottom-navigation';
import { Button } from '@/components/ui/button';
import { letters } from '@/lib/const';
import { openDatabase } from '@/lib/db';
import { useElementSize } from '@/lib/use-element-size';
import { getNextLetter, getPrevLetter } from '@/lib/utils';
import { Trash2, Undo2 } from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

interface PracticePageProps {
  letter: string;
  type: string;
}

export function PracticePage(
  {
    letter,
    type,
  }: PracticePageProps
) {
  const canvasRef = useRef<CanvasDraw>(null);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const initialLoaded = useRef(false);

  const letterIndex = letters[type].findIndex(o => o.kana === decodeURIComponent(letter))
  const nextLetter = getNextLetter(type, letterIndex)
  const prevLetter = getPrevLetter(type, letterIndex)

  const parsedCanvasData: Record<string, unknown> | null = canvasData ? JSON.parse(canvasData) : null;
  const lines = (parsedCanvasData?.lines as unknown[]) ?? []
  const undoDisabled = lines.length === 0;

  const letterObj = letters[type].find(o => o.kana === decodeURIComponent(letter));

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

  const { ref, width } = useElementSize();
  let canvasSize = width;
  if (canvasSize === 0) {
    canvasSize = 400;
  }
  if (canvasSize <= 400) {
    canvasSize = canvasSize - 40;
  } else {
    canvasSize = 400;
  }

  return (
    <Fragment>
      <hr className="bg-gray-50" />
      <main
        ref={ref}
        className="container mx-auto"
      >
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">
            Practice {decodeURIComponent(letter)}
          </h1>
          <div className='w-full flex gap-8 mb-8 flex-wrap justify-center'>
            <div>
              <video
                className={`size-[${canvasSize}px] border border-gray-300`}
                width={canvasSize}
                height={canvasSize}
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
                canvasHeight={canvasSize}
                canvasWidth={canvasSize}
                gridSizeX={(canvasSize / 2) + 20}
                gridSizeY={(canvasSize / 2) + 20}
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