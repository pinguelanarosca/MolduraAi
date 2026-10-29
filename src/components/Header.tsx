import React from 'react';
import { Download, Sparkles, Chrome, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
  downloadSuccess: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onDownloadZip,
  isDownloading,
  downloadSuccess,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-emerald-500 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Moldura de IA
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Chrome className="w-3 h-3" /> Chrome Extension
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Identificação visual luminosa em tempo real para Gemini, ChatGPT, Claude, Grok e Meta AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Manifest V3
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400 font-medium">Menu de Opções Incluso</span>
          </div>

          <button
            onClick={onDownloadZip}
            disabled={isDownloading}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
              downloadSuccess
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
            title="Baixar pacote completo da extensão para instalar no Chrome"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>Extensão Baixada!</span>
              </>
            ) : (
              <>
                <Download className={`w-4 h-4 ${isDownloading ? 'animate-spin' : ''}`} />
                <span>{isDownloading ? 'Gerando ZIP...' : 'Baixar Extensão (.ZIP)'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
