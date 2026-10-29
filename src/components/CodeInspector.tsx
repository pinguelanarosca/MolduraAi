import React, { useState } from 'react';
import {
  generateContentCss,
  generateContentScript,
  generateManifest,
  generateReadme,
  generatePopupHtml,
  generatePopupJs,
  generatePopupCss,
} from '../utils/aiDetector';
import { Copy, Check, FileCode, FileText, Code2, Sliders } from 'lucide-react';

export const CodeInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'popup' | 'popupJs' | 'popupCss' | 'content' | 'styles' | 'manifest' | 'readme'>('popup');
  const [copied, setCopied] = useState(false);

  const files = {
    popup: {
      name: 'popup.html',
      icon: <Sliders className="w-4 h-4 text-blue-400" />,
      code: generatePopupHtml(),
      lang: 'html',
      desc: 'Menu de opções idêntico exibido ao clicar no ícone da extensão',
    },
    popupJs: {
      name: 'popup.js',
      icon: <FileCode className="w-4 h-4 text-emerald-400" />,
      code: generatePopupJs(),
      lang: 'javascript',
      desc: 'Gerencia as opções e salva no chrome.storage.sync',
    },
    popupCss: {
      name: 'popup.css',
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      code: generatePopupCss(),
      lang: 'css',
      desc: 'Estilos modernos do popup, animações e seletores de opções',
    },
    content: {
      name: 'content.js',
      icon: <FileCode className="w-4 h-4 text-emerald-400" />,
      code: generateContentScript(),
      lang: 'javascript',
      desc: 'Injeta a moldura na aba e reage instantaneamente às mudanças de opções',
    },
    styles: {
      name: 'styles.css',
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      code: generateContentCss(),
      lang: 'css',
      desc: 'Gradiente cônico giratório coordenado entre branco e cores neon',
    },
    manifest: {
      name: 'manifest.json',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      code: JSON.stringify(generateManifest(), null, 2),
      lang: 'json',
      desc: 'Manifesto V3 oficial do Chrome com ação popup e permissão storage',
    },
    readme: {
      name: 'README.md',
      icon: <FileText className="w-4 h-4 text-slate-400" />,
      code: generateReadme(),
      lang: 'markdown',
      desc: 'Guia rápido de instalação e uso do menu de opções',
    },
  };

  const currentFile = files[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1">
            <Code2 className="w-3.5 h-3.5" />
            <span>Transparência e Código Limpo</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Código-Fonte da Extensão e Menu de Opções
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Arquivos prontos para uso. Todos incluídos no pacote .ZIP para instalação no Chrome.
          </p>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copiado com sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar {currentFile.name}</span>
            </>
          )}
        </button>
      </div>

      {/* File Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2">
        {(Object.keys(files) as Array<keyof typeof files>).map((key) => {
          const f = files[key];
          const isSelected = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              type="button"
              className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {f.icon}
              <span>{f.name}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-slate-400 italic">{currentFile.desc}</p>
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-300">{currentFile.name}</span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">{currentFile.lang}</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed select-text">
            <code>{currentFile.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
