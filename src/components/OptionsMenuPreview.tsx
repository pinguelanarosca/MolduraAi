import React from 'react';
import { AiPlatformConfig, AI_PLATFORMS } from '../utils/aiDetector';
import { Sparkles, Check, Sliders, ShieldCheck } from 'lucide-react';

interface OptionsMenuPreviewProps {
  activePlatform: AiPlatformConfig;
  borderThickness: number;
  onChangeThickness: (thickness: number) => void;
  animationSpeed: number;
  onChangeSpeed: (speed: number) => void;
  glowIntensity: 'normal' | 'high';
  onChangeGlow: (glow: 'normal' | 'high') => void;
  enabledPlatforms: Record<string, boolean>;
  onTogglePlatform: (id: string) => void;
}

export const OptionsMenuPreview: React.FC<OptionsMenuPreviewProps> = ({
  activePlatform,
  borderThickness,
  onChangeThickness,
  animationSpeed,
  onChangeSpeed,
  glowIntensity,
  onChangeGlow,
  enabledPlatforms,
  onTogglePlatform,
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Menu de Opções Integrado na Extensão</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Menu de Opções Idêntico (Popup e Página de Opções)
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Este é o menu idêntico incluído na extensão. Você pode acessá-lo clicando no ícone da extensão no Chrome ou nas opções da aba.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Sincronização instantânea via <code className="text-blue-300">chrome.storage</code></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Identical Popup Interface */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[370px] bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Moldura de IA</h4>
                  <p className="text-[11px] text-slate-400">Menu de Opções da Extensão</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                Manifest V3
              </span>
            </div>

            {/* Mini Live Preview inside Popup */}
            <div
              className="relative h-16 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center"
              style={{
                ['--active-neon-base' as string]: activePlatform.primaryNeon,
                ['--active-neon-accent' as string]: activePlatform.accentColor,
                ['--active-neon-glow' as string]:
                  glowIntensity === 'high' ? activePlatform.glowRgba : activePlatform.glowRgba.replace('0.5', '0.25'),
                ['--spin-duration' as string]: `${animationSpeed}s`,
              }}
            >
              <div className="ai-preview-bloom-effect absolute inset-0 pointer-events-none" />
              <div
                className="ai-preview-border-effect absolute inset-0 pointer-events-none"
                style={{
                  borderWidth: `${borderThickness}px`,
                  borderStyle: 'solid',
                }}
              />
              <div className="relative z-10 text-center">
                <span className="text-xs font-bold text-white block">Preview em Tempo Real</span>
                <span className="text-[10px] text-slate-400 block">
                  {activePlatform.name} ({activePlatform.colorName})
                </span>
              </div>
            </div>

            {/* Controls Identical to Prompt Image */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-3">
              {/* Espessura */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span>📏 Espessura da Moldura:</span>
                  <span className="text-blue-400 font-mono text-[10px]">{borderThickness}px</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  {[2.5, 3.5, 5.0].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onChangeThickness(val)}
                      className={`cursor-pointer py-1 text-center font-semibold rounded transition-colors text-[11px] ${
                        borderThickness === val
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}px {val === 3.5 ? '(Ideal)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Velocidade */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span>⚡ Velocidade do Fluxo:</span>
                  <span className="text-blue-400 font-mono text-[10px]">{animationSpeed}s</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  {[
                    { label: 'Suave', speed: 5.5 },
                    { label: 'Normal', speed: 4.0 },
                    { label: 'Rápido', speed: 2.2 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onChangeSpeed(item.speed)}
                      className={`cursor-pointer py-1 text-center font-semibold rounded transition-colors text-[11px] ${
                        animationSpeed === item.speed
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aura Fluorescente */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-300">
                  <span>🔮 Aura Fluorescente:</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => onChangeGlow('high')}
                    className={`cursor-pointer py-1 text-center font-semibold rounded transition-colors text-[11px] ${
                      glowIntensity === 'high'
                        ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Neon Intenso
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeGlow('normal')}
                    className={`cursor-pointer py-1 text-center font-semibold rounded transition-colors text-[11px] ${
                      glowIntensity === 'normal'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Discreto
                  </button>
                </div>
              </div>
            </div>

            {/* Platform Toggles */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Ativar / Desativar por IA:
              </div>
              <div className="space-y-1.5">
                {Object.values(AI_PLATFORMS).map((p) => {
                  const isChecked = enabledPlatforms[p.id] !== false;
                  return (
                    <div
                      key={p.id}
                      onClick={() => onTogglePlatform(p.id)}
                      className="cursor-pointer flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-sm"
                          style={{
                            backgroundColor: p.primaryNeon,
                            boxShadow: `0 0 6px ${p.primaryNeon}`,
                          }}
                        />
                        <span className="text-xs font-semibold text-white">{p.name}</span>
                        <span className="text-[10px] text-slate-400">({p.colorName.split(' ')[0]})</span>
                      </div>
                      <div
                        className={`w-8 h-4 rounded-full transition-colors relative flex items-center p-0.5 ${
                          isChecked ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-white transition-transform ${
                            isChecked ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-1 text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Opções salvas e sincronizadas automaticamente</span>
            </div>
          </div>
        </div>

        {/* Right: Explanation & Features */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Como Funciona na Extensão Instalada
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ao instalar a extensão no Chrome, este mesmo menu de opções estará disponível diretamente:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white">Clique no Ícone da Extensão:</strong> Abre o popup compacto com todos os seletores de espessura, velocidade, aura e IAs ativas.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white">Página de Opções Completa:</strong> Acessível clicando com o botão direito no ícone da extensão &gt; <em>Opções</em>.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white">Sem Necessidade de Recarregar:</strong> O <code className="text-blue-300 font-mono">content.js</code> utiliza <code className="text-blue-300 font-mono">chrome.storage.onChanged</code> para atualizar a moldura na aba imediatamente no instante em que você clica em qualquer opção.
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Arquivos Gerados para o Menu de Opções:
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-emerald-400 font-bold block">popup.html</span>
                <span className="text-[11px] text-slate-400">Interface visual idêntica</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-blue-400 font-bold block">popup.js</span>
                <span className="text-[11px] text-slate-400">Controles & chrome.storage</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-purple-400 font-bold block">popup.css</span>
                <span className="text-[11px] text-slate-400">Tema escuro & botões</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block">options.html</span>
                <span className="text-[11px] text-slate-400">Página de opções do Chrome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
