'use client';

import { Button } from '@/components/ui/button';
import { letters } from '@/lib/const';
import { openDatabase } from '@/lib/db';
import { useElementSize } from '@/lib/use-element-size';
import { Trash2, Undo2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  else if (canvasSize <= 400) {
    canvasSize = canvasSize - 40;
  } else {
    canvasSize = 400;
  }

  console.log(canvasSize);

  return (
    <div
      ref={ref}
      className="mt-8 flex flex-col items-center"
    >
      <div className='w-full flex gap-8 flex-wrap justify-center'>
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
            gridColor='rgb(0, 0, 0, 0.3)'
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
    </div>
  )
}