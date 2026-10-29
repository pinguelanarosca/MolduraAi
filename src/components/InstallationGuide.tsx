import React from 'react';
import { Download, FolderArchive, Chrome, ToggleRight, Sparkles, Check } from 'lucide-react';

interface InstallationGuideProps {
  onDownloadZip: () => void;
  isDownloading: boolean;
}

export const InstallationGuide: React.FC<InstallationGuideProps> = ({
  onDownloadZip,
  isDownloading,
}) => {
  const steps = [
    {
      step: 1,
      icon: <Download className="w-5 h-5 text-blue-400" />,
      title: 'Baixar e Extrair o Arquivo',
      description:
        'Clique no botão abaixo para baixar o arquivo .zip com todos os arquivos da extensão prontos. Extraia a pasta em qualquer local do seu computador.',
    },
    {
      step: 2,
      icon: <Chrome className="w-5 h-5 text-amber-400" />,
      title: 'Abrir a Página de Extensões do Chrome',
      description: (
        <span>
          No Google Chrome, acesse a URL{' '}
          <code className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 font-mono text-xs">
            chrome://extensions
          </code>{' '}
          na barra de endereços.
        </span>
      ),
    },
    {
      step: 3,
      icon: <ToggleRight className="w-5 h-5 text-purple-400" />,
      title: 'Ativar "Modo do Desenvolvedor"',
      description:
        'No canto superior direito da página de extensões, ligue a chave seletora "Modo do desenvolvedor" (Developer mode).',
    },
    {
      step: 4,
      icon: <FolderArchive className="w-5 h-5 text-emerald-400" />,
      title: 'Carregar sem compactação',
      description:
        'Clique no botão "Carregar sem compactação" (Load unpacked) no topo esquerdo e selecione a pasta extraída. A moldura entrará em ação imediatamente!',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
            <Check className="w-3.5 h-3.5" />
            <span>Instalação em 20 Segundos</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Como Ativar no Seu Google Chrome
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Instale a extensão localmente no modo desenvolvedor sem precisar da Chrome Web Store.
          </p>
        </div>

        <button
          onClick={onDownloadZip}
          disabled={isDownloading}
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Gerando...' : 'Baixar Pacote da Extensão'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">PASSO {s.step}</span>
            </div>
            <h4 className="font-bold text-sm text-white">{s.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed flex-1">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Verification notice */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200">
        <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
        <span>
          <strong>Zero configuração:</strong> Depois de carregar a pasta, basta abrir ChatGPT, Gemini, Grok, Claude ou Meta AI. A extensão detecta a URL e ativa a moldura animada automaticamente.
        </span>
      </div>
    </div>
  );
};
