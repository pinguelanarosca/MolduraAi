import React from 'react';
import { Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { AiPlatformConfig } from '../utils/aiDetector';

interface ReferenceComparisonProps {
  activePlatform: AiPlatformConfig;
}

export const ReferenceComparison: React.FC<ReferenceComparisonProps> = ({ activePlatform }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fidelidade Visual à Referência Enviada</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Comparação com a Caixa de Chat do AI Studio
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            A extensão reproduz exatamente o comportamento do feixe luminoso em movimento coordenado entre o branco e a cor neon.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left: Original Reference from user */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-white">Sua Imagem de Referência</span>
            <span className="text-[11px] text-slate-400">Caixa de entrada AI Studio</span>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center bg-slate-950">
            <img
              src="/assets/aistudio/image_1c4a5541.png"
              alt="Referência da moldura do chat AI Studio"
              className="rounded-lg max-h-56 object-contain border border-slate-800 shadow-md"
            />
          </div>
          <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
            Moldura com brilho sutil ao redor dos limites da caixa com reflexo em movimento.
          </div>
        </div>

        {/* Right: Implemented Behavior Details */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4 justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Como a Extensão Atende a Cada Requisito:</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Moldura ao redor dos limites da tela:</strong> Injetada como camada fixa (<code className="text-blue-300">inset: 0</code>, <code className="text-blue-300">100vw × 100vh</code>), cobrindo todo o contorno do navegador.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Movimento coordenado com branco:</strong> O gradiente cônico rotaciona continuamente alternando entre o branco puro (<code className="text-blue-300">#FFFFFF</code>) e a cor fluorescente de cada IA.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Espessura calibrada (~3.5px):</strong> Ligeiramente mais grossa que a caixa de chat para excelente visibilidade em telas de alta resolução sem poluir a visão.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Cores fluorescentes solicitadas:</strong> Meta (Roxo), Gemini (Azul), Grok (Amarelo), Claude (Alaranjado) e ChatGPT (Verde).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Simples e concisa:</strong> Sem menus, botões ou opções complexas. Totalmente automática e leve.
                </div>
              </li>
            </ul>
          </div>

          <div
            className="p-3.5 rounded-xl border flex items-center justify-between text-xs"
            style={{
              borderColor: `${activePlatform.primaryNeon}40`,
              backgroundColor: `${activePlatform.primaryNeon}10`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: activePlatform.primaryNeon }}
              />
              <span className="font-semibold text-white">
                IA Atual: {activePlatform.name} ({activePlatform.colorName})
              </span>
            </div>
            <span className="font-mono text-[11px]" style={{ color: activePlatform.accentColor }}>
              {activePlatform.primaryNeon} + #FFFFFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
