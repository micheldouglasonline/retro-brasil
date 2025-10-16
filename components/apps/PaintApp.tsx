
import React, { useRef, useEffect, useState } from 'react';

const colors = [
  '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000'
];
const neonColors = [
    '#FFFFFF', '#FF3131', '#00FF7F', '#4D4DFF', '#FFFF33', '#FF00FF', '#00FFFF', '#000000'
]

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(5);

  const getContext = (): CanvasRenderingContext2D | null => {
      return canvasRef.current ? canvasRef.current.getContext('2d') : null;
  }

  useEffect(() => {
    const ctx = getContext();
    if (ctx) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, []);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = getContext();
    if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = getContext();
    if (ctx) {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
  };

  const stopDrawing = () => {
    const ctx = getContext();
    if (ctx) {
        ctx.closePath();
    }
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const ctx = getContext();
    if(ctx){
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white">
      <div className="p-2 bg-gray-800 border-b-2 border-cyan-500 flex items-center space-x-4">
        <div className="flex space-x-1">
            {neonColors.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`w-6 h-6 border-2 ${color === c ? 'border-white' : 'border-gray-500'}`} style={{ backgroundColor: c }} />
            ))}
        </div>
        <div>
            <label htmlFor="brushSize" className="mr-2">Tamanho:</label>
            <input type="range" id="brushSize" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
        </div>
        <button onClick={clearCanvas} className="px-3 py-1 bg-red-600 hover:bg-red-700 border border-white">Limpar</button>
      </div>
      <div className="flex-grow overflow-hidden">
        <canvas
            ref={canvasRef}
            width="580"
            height="350"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair"
        />
      </div>
    </div>
  );
};
