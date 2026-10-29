import React, { useEffect } from 'react';
import { AiPlatformConfig, AI_PLATFORMS } from '../utils/aiDetector';
import { X, Sparkles, Check } from 'lucide-react';

interface FullscreenOverlayProps {
  activePlatform: AiPlatformConfig;
  onSelectPlatform: (platform: AiPlatformConfig) => void;
  onClose: () => void;
  borderThickness: number;
  animationSpeed: number;
}

export const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({
  activePlatform,
  onSelectPlatform,
  onClose,
  borderThickness,
  animationSpeed,
}) => {
  // Allow Esc key to close fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const overlayStyles: React.CSSProperties = {
    ['--active-neon-base' as string]: activePlatform.primaryNeon,
    ['--active-neon-accent' as string]: activePlatform.accentColor,
    ['--active-neon-glow' as string]: activePlatform.glowRgba,
    ['--spin-duration' as string]: `${animationSpeed}s`,
  };

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
      style={overlayStyles}
    >
      {/* 1. Bloom Aura across viewport edges */}
      <div className="ai-preview-bloom-effect absolute inset-0 pointer-events-none" />

      {/* 2. The Flowing Neon + White Border around the full browser limits */}
      <div
        className="ai-preview-border-effect absolute inset-0 pointer-events-none"
        style={{
          borderWidth: `${borderThickness}px`,
          borderStyle: 'solid',
        }}
      />

      {/* Floating Control Bar for easy testing (pointer-events-auto) */}
      <div className="pointer-events-auto absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-950/90 border border-slate-700/80 p-2 rounded-2xl shadow-2xl backdrop-blur-md text-white animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-2 pl-2 pr-1">
          <Sparkles className="w-4 h-4" style={{ color: activePlatform.primaryNeon }} />
          <span className="text-xs font-bold">{activePlatform.name}</span>
          <span className="text-[11px] text-slate-400">({activePlatform.colorName})</span>
        </div>

        <div className="h-4 w-[1px] bg-slate-700" />

        {/* Quick Platform Switcher */}
        <div className="flex items-center gap-1">
          {Object.values(AI_PLATFORMS).map((p) => {
            const isSelected = p.id === activePlatform.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPlatform(p)}
                type="button"
                className={`cursor-pointer px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-white/20 text-white shadow-sm ring-1 ring-white/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={`Alternar para ${p.name}`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: p.primaryNeon }}
                />
                <span className="hidden sm:inline">{p.name}</span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-slate-700" />

        <button
          onClick={onClose}
          type="button"
          className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          title="Fechar tela cheia (ou pressione ESC)"
        >
          <X className="w-3.5 h-3.5" />
          <span>Sair (ESC)</span>
        </button>
      </div>

      {/* Subtle indicator in corner */}
      <div className="absolute bottom-4 right-4 pointer-events-auto bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-300 backdrop-blur-sm">
        Moldura ativa no limite de tela • Pressione <kbd className="px-1 py-0.5 bg-slate-800 rounded text-white font-mono text-[10px]">ESC</kbd> para fechar
      </div>
    </div>
  );
};
