import React, { useState, useEffect, useRef, useCallback } from 'react';

// Game constants
const CANVAS_SIZE = 400;
const SCALE = 20;
const INITIAL_SNAKE = [{ x: 8, y: 8 }, { x: 8, y: 7 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const SPEED = 200;
const DIRECTIONS: { [key: string]: { x: number; y: number } } = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};

export const GamesApp: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [dir, setDir] = useState({ x: 0, y: 1 }); // Start going down
    const [speed, setSpeed] = useState<number | null>(SPEED);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const createFood = useCallback((currentSnake: {x: number, y: number}[]) => {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
                y: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
            };
        } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, []);

    const startGame = useCallback(() => {
        const newSnake = [{ x: 8, y: 8 }, { x: 8, y: 7 }];
        setSnake(newSnake);
        setFood(createFood(newSnake));
        setDir({ x: 0, y: 1 });
        setSpeed(SPEED);
        setGameOver(false);
        setScore(0);
    }, [createFood]);


    const moveSnake = useCallback((key: string) => {
        if (Object.keys(DIRECTIONS).includes(key)) {
            setDir(currentDir => {
                 const newDir = DIRECTIONS[key];
                // Prevent reversing
                const isOppositeX = currentDir.x !== 0 && newDir.x === -currentDir.x;
                const isOppositeY = currentDir.y !== 0 && newDir.y === -currentDir.y;
                if (isOppositeX || isOppositeY) {
                    return currentDir;
                }
                return newDir;
            });
        }
    }, []);

    const gameLoop = useCallback(() => {
        setSnake(prevSnake => {
            const snakeCopy = JSON.parse(JSON.stringify(prevSnake));
            const newSnakeHead = { x: snakeCopy[0].x + dir.x, y: snakeCopy[0].y + dir.y };

            // Wall collision
            if (newSnakeHead.x >= CANVAS_SIZE / SCALE || newSnakeHead.x < 0 || newSnakeHead.y >= CANVAS_SIZE / SCALE || newSnakeHead.y < 0) {
                setGameOver(true);
                setSpeed(null);
                return prevSnake;
            }

            // Self collision
            for (let i = 1; i < snakeCopy.length; i++) {
                if (newSnakeHead.x === snakeCopy[i].x && newSnakeHead.y === snakeCopy[i].y) {
                    setGameOver(true);
                    setSpeed(null);
                    return prevSnake;
                }
            }
            
            snakeCopy.unshift(newSnakeHead);

            // Food collision
            if (newSnakeHead.x === food.x && newSnakeHead.y === food.y) {
                setScore(prev => prev + 1);
                setFood(createFood(snakeCopy));
            } else {
                snakeCopy.pop();
            }
            
            return snakeCopy;
        });
    }, [dir, food, createFood]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => moveSnake(e.key);
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [moveSnake]);

    useEffect(() => {
        if (!gameOver && speed !== null) {
            const interval = setInterval(gameLoop, speed);
            return () => clearInterval(interval);
        }
    }, [speed, gameLoop, gameOver]);
    
    useEffect(() => {
        const context = canvasRef.current?.getContext("2d");
        if (context) {
            context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
            context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            
            // Draw food
            context.fillStyle = "magenta";
            context.shadowBlur = 10;
            context.shadowColor = "magenta";
            context.fillRect(food.x, food.y, 1, 1);
            
            // Draw snake
            context.fillStyle = "lime";
            context.shadowBlur = 10;
            context.shadowColor = "lime";
            snake.forEach(({ x, y }) => context.fillRect(x, y, 1, 1));
            
            context.shadowBlur = 0;
        }
    }, [snake, food]);


    return (
        <div className="w-full h-full bg-black bg-opacity-70 text-white flex flex-col justify-center items-center p-2">
            <div className="flex justify-between w-full p-2 text-xl border-2 border-fuchsia-500 bg-black mb-2">
                <span className="text-fuchsia-400">PONTOS</span>
                <span className="text-cyan-300">{score}</span>
            </div>
            <div className="relative border-2 border-cyan-400 shadow-[0_0_10px_#0ff]">
                {gameOver && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-10">
                        <div className="text-4xl text-red-500 drop-shadow-[0_0_5px_#f00]">GAME OVER</div>
                        <button onClick={startGame} className="mt-4 px-4 py-2 bg-green-500 text-black border-2 border-white text-lg font-bold hover:shadow-[0_0_10px_#fff]">
                            JOGAR NOVAMENTE
                        </button>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    width={`${CANVAS_SIZE}px`}
                    height={`${CANVAS_SIZE}px`}
                    className="bg-black"
                />
            </div>
        </div>
    );
};
