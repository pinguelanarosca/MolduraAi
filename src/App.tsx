/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AI_PLATFORMS, AiPlatformConfig } from './utils/aiDetector';
import { createExtensionZip } from './utils/zipGenerator';
import { Header } from './components/Header';
import { Simulator } from './components/Simulator';
import { OptionsMenuPreview } from './components/OptionsMenuPreview';
import { ReferenceComparison } from './components/ReferenceComparison';
import { InstallationGuide } from './components/InstallationGuide';
import { CodeInspector } from './components/CodeInspector';
import { FullscreenOverlay } from './components/FullscreenOverlay';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activePlatform, setActivePlatform] = useState<AiPlatformConfig>(AI_PLATFORMS.gemini);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [borderThickness, setBorderThickness] = useState<number>(3.5);
  const [animationSpeed, setAnimationSpeed] = useState<number>(4.0);
  const [glowIntensity, setGlowIntensity] = useState<'normal' | 'high'>('high');
  const [enabledPlatforms, setEnabledPlatforms] = useState<Record<string, boolean>>({
    chatgpt: true,
    gemini: true,
    claude: true,
    grok: true,
    meta: true,
  });

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleTogglePlatform = (id: string) => {
    setEnabledPlatforms((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      let zipBlob: Blob;
      try {
        const response = await fetch(`/extensao-moldura-ia-chrome.zip?v=${Date.now()}`);
        if (response.ok) {
          zipBlob = await response.blob();
        } else {
          zipBlob = await createExtensionZip();
        }
      } catch {
        zipBlob = await createExtensionZip();
      }

      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'extensao-moldura-ia-chrome.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Falha ao baixar arquivo ZIP:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Fullscreen interactive test overlay */}
      {isFullscreen && (
        <FullscreenOverlay
          activePlatform={activePlatform}
          onSelectPlatform={setActivePlatform}
          onClose={() => setIsFullscreen(false)}
          borderThickness={borderThickness}
          animationSpeed={animationSpeed}
        />
      )}

      {/* Main Header */}
      <Header
        onDownloadZip={handleDownloadZip}
        isDownloading={isDownloading}
        downloadSuccess={downloadSuccess}
      />

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Extensão para Google Chrome • Com Menu de Opções Idêntico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Moldura Luminosa ao Redor da Tela
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Identifique instantaneamente qual Inteligência Artificial está aberta na sua aba com menu de opções
            para personalizar a espessura da moldura, velocidade do fluxo e intensidade da aura fluorescente.
          </p>
        </div>

        {/* 1. Interactive Simulator & Live Preview */}
        <section aria-label="Simulador Interativo da Extensão">
          <Simulator
            activePlatform={activePlatform}
            onSelectPlatform={setActivePlatform}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            borderThickness={borderThickness}
            onChangeThickness={setBorderThickness}
            animationSpeed={animationSpeed}
            onChangeSpeed={setAnimationSpeed}
            glowIntensity={glowIntensity}
            onChangeGlow={setGlowIntensity}
          />
        </section>

        {/* 2. Identical Extension Options Menu Preview */}
        <section aria-label="Menu de Opções da Extensão">
          <OptionsMenuPreview
            activePlatform={activePlatform}
            borderThickness={borderThickness}
            onChangeThickness={setBorderThickness}
            animationSpeed={animationSpeed}
            onChangeSpeed={setAnimationSpeed}
            glowIntensity={glowIntensity}
            onChangeGlow={setGlowIntensity}
            enabledPlatforms={enabledPlatforms}
            onTogglePlatform={handleTogglePlatform}
          />
        </section>

        {/* 3. Side-by-Side Reference Comparison with user's screenshot */}
        <section aria-label="Comparativo de Fidelidade Visual">
          <ReferenceComparison activePlatform={activePlatform} />
        </section>

        {/* 4. Step-by-Step Installation Guide */}
        <section aria-label="Guia de Instalação no Chrome">
          <InstallationGuide
            onDownloadZip={handleDownloadZip}
            isDownloading={isDownloading}
          />
        </section>

        {/* 5. Full Code Inspector */}
        <section aria-label="Inspetor de Código-Fonte">
          <CodeInspector />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 font-semibold">Moldura de IA para Google Chrome</span>
          </div>
          <p>
            Compatível com ChatGPT, Google Gemini, Claude, Grok e Meta AI • Menu de Opções incluso.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Manifest V3</span>
            <span>•</span>
            <span>chrome.storage sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
