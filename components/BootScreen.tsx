
import React, { useState, useEffect } from 'react';

const bootLines = [
  'RB-DOS 1.0 INICIANDO...',
  'MEMORIA: 640K OK',
  'VERIFICANDO DISCO RIGIDO (C:)...',
  'CONTROLADOR DE DISQUETE... OK',
  'INICIALIZANDO MOUSE... OK',
  'CARREGANDO INTERFACE GRAFICA...',
  '........................',
  'BEM-VINDO AO SISTEMA OPERACIONAL',
  'RETRO BRASIL',
];

export const BootScreen: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black text-green-400 text-2xl p-8 flex flex-col font-mono">
      {visibleLines.map((line, index) => (
        <p key={index} className="whitespace-pre">
          {line}
          {index === visibleLines.length - 1 && <span className="animate-pulse">_</span>}
        </p>
      ))}
      <div className="flex-grow"></div>
    </div>
  );
};
