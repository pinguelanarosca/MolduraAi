import React, { useState } from 'react';
import {
  AI_PLATFORMS,
  AiPlatformConfig,
} from '../utils/aiDetector';
import {
  Maximize2,
  Minimize2,
  ExternalLink,
  Sliders,
  Sparkles,
  Lock,
  RotateCw,
  Info,
} from 'lucide-react';

interface SimulatorProps {
  activePlatform: AiPlatformConfig;
  onSelectPlatform: (platform: AiPlatformConfig) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  borderThickness: number;
  onChangeThickness: (thickness: number) => void;
  animationSpeed: number;
  onChangeSpeed: (speed: number) => void;
  glowIntensity: 'normal' | 'high';
  onChangeGlow: (glow: 'normal' | 'high') => void;
}

export const Simulator: React.FC<SimulatorProps> = ({
  activePlatform,
  onSelectPlatform,
  isFullscreen,
  onToggleFullscreen,
  borderThickness,
  onChangeThickness,
  animationSpeed,
  onChangeSpeed,
  glowIntensity,
  onChangeGlow,
}) => {
  // Custom CSS variables for the active platform
  const previewStyles: React.CSSProperties = {
    ['--active-neon-base' as string]: activePlatform.primaryNeon,
    ['--active-neon-accent' as string]: activePlatform.accentColor,
    ['--active-neon-glow' as string]:
      glowIntensity === 'high' ? activePlatform.glowRgba : activePlatform.glowRgba.replace('0.5', '0.25'),
    ['--spin-duration' as string]: `${animationSpeed}s`,
  };

  return (
    <div className="space-y-6">
      {/* Platform Selector Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Selecione uma Inteligência Artificial para Simular:
          </label>
          <span className="text-xs text-slate-400">
            Cor Ativa: <span className="font-semibold text-white">{activePlatform.colorName}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {Object.values(AI_PLATFORMS).map((p) => {
            const isSelected = p.id === activePlatform.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPlatform(p)}
                type="button"
                className={`cursor-pointer group relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'bg-slate-900 border-white/40 shadow-xl shadow-black/50 ring-2'
                    : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
                style={{
                  ringColor: isSelected ? p.primaryNeon : undefined,
                }}
              >
                {/* Visual neon indicator orb */}
                <div className="flex items-center gap-2 mb-1.5 w-full justify-between">
                  <span className="font-bold text-sm text-white group-hover:text-white">
                    {p.name}
                  </span>
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-md animate-pulse"
                    style={{
                      backgroundColor: p.primaryNeon,
                      boxShadow: `0 0 8px ${p.primaryNeon}`,
                    }}
                  />
                </div>
                <div className="w-full flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">{p.colorName}</span>
                  <span className="text-[10px] text-slate-400">{p.domainHints[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">Espessura da Moldura:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[2.5, 3.5, 5].map((thickness) => (
                <button
                  key={thickness}
                  type="button"
                  onClick={() => onChangeThickness(thickness)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    borderThickness === thickness
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {thickness}px {thickness === 3.5 ? '(Ideal)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-medium">Velocidade do Fluxo:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[
                { label: 'Suave', speed: 5.5 },
                { label: 'Normal', speed: 4.0 },
                { label: 'Rápido', speed: 2.2 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onChangeSpeed(item.speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    animationSpeed === item.speed
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-medium">Aura Fluorescente:</span>
            <button
              type="button"
              onClick={() => onChangeGlow(glowIntensity === 'high' ? 'normal' : 'high')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border ${
                glowIntensity === 'high'
                  ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {glowIntensity === 'high' ? 'Neon Intenso' : 'Discreto'}
            </button>
          </div>
        </div>

        <button
          onClick={onToggleFullscreen}
          type="button"
          className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md shadow-blue-600/20"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Sair da Tela Cheia</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Testar em Tela Cheia no Navegador</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Browser Window Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        {/* Mock Chrome Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            {/* Active Browser Tab */}
            <div className="ml-3 flex items-center gap-2 px-3 py-1 rounded-t-lg bg-slate-950 border-t border-l border-r border-slate-800 text-white font-medium text-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activePlatform.primaryNeon }}
              />
              <span className="truncate max-w-[140px]">{activePlatform.name}</span>
            </div>
          </div>

          {/* Chrome URL Address Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{activePlatform.sampleUrl}</span>
              <RotateCw className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Preview 1:1</span>
          </div>
        </div>

        {/* Viewport Container with the Animated Glowing Border */}
        <div
          className="relative min-h-[440px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"
          style={previewStyles}
        >
          {/* 1. The Glowing Bloom (Shadow Aura) */}
          <div className="ai-preview-bloom-effect absolute inset-0 pointer-events-none" />

          {/* 2. The Animated Border Line that flows between White and Neon */}
          <div
            className="ai-preview-border-effect absolute inset-0 pointer-events-none"
            style={{
              borderWidth: `${borderThickness}px`,
              borderStyle: 'solid',
            }}
          />

          {/* Browser Viewport Content Mock */}
          <div className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md"
              style={{
                borderColor: `${activePlatform.primaryNeon}50`,
                backgroundColor: `${activePlatform.primaryNeon}15`,
                color: activePlatform.accentColor,
              }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Moldura Ativa: {activePlatform.name} ({activePlatform.colorName})</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Identificação Visual Instantânea
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Observe o feixe de luz branco percorrendo continuamente as bordas da tela e
                se harmonizando com a cor fluorescente especificada para esta IA.
              </p>
            </div>

            {/* Mocked AI Prompt Box reminiscent of the user's reference */}
            <div className="relative rounded-2xl bg-slate-900/90 p-4 border border-slate-700/80 shadow-2xl text-left space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-medium text-slate-300">Prompt / Pergunta</span>
                <span className="text-[11px] text-slate-400">Modo padrão</span>
              </div>
              <p className="text-sm text-slate-200">
                Como funciona a extensão de moldura luminosa nos limites da tela?
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  Totalmente passivo: não bloqueia cliques nem botões da tela
                </span>
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white cursor-not-allowed opacity-90 shadow-md"
                  style={{ backgroundColor: activePlatform.primaryNeon }}
                >
                  Enviar
                </button>
              </div>
            </div>

            {/* Quick platform facts */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left">
                <div className="text-[11px] text-slate-400">Cor Fluorescente</div>
                <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: activePlatform.primaryNeon }}
                  />
                  {activePlatform.colorName}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left">
                <div className="text-[11px] text-slate-400">Fluxo Coordenado</div>
                <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white inline-block shadow-sm" />
                  Branco Puro (#FFF)
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-left">
                <div className="text-[11px] text-slate-400">Sites Monitorados</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">
                  {activePlatform.domainHints.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Footer of the simulator */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-800/60">
            <span>pointer-events: none (zero interferência na usabilidade do site)</span>
            <span className="text-slate-300 font-mono">
              inset: 0 | width: 100vw | height: 100vh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
