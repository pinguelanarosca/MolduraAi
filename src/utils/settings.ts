export interface ExtensionSettings {
  borderThickness: number; // 2.5 | 3.5 | 5.0
  animationSpeed: number; // 5.5 | 4.0 | 2.2
  glowIntensity: 'normal' | 'high';
  enabledPlatforms: {
    chatgpt: boolean;
    gemini: boolean;
    claude: boolean;
    grok: boolean;
    meta: boolean;
  };
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  borderThickness: 3.5,
  animationSpeed: 4.0,
  glowIntensity: 'high',
  enabledPlatforms: {
    chatgpt: true,
    gemini: true,
    claude: true,
    grok: true,
    meta: true,
  },
};

export function validateSettings(input: Partial<ExtensionSettings> | null | undefined): ExtensionSettings {
  if (!input || typeof input !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  const borderThickness =
    typeof input.borderThickness === 'number' && [2.5, 3.5, 5.0].includes(input.borderThickness)
      ? input.borderThickness
      : DEFAULT_SETTINGS.borderThickness;

  const animationSpeed =
    typeof input.animationSpeed === 'number' && input.animationSpeed > 0 && input.animationSpeed <= 10
      ? input.animationSpeed
      : DEFAULT_SETTINGS.animationSpeed;

  const glowIntensity =
    input.glowIntensity === 'normal' || input.glowIntensity === 'high'
      ? input.glowIntensity
      : DEFAULT_SETTINGS.glowIntensity;

  const enabledPlatforms = {
    chatgpt: input.enabledPlatforms?.chatgpt ?? true,
    gemini: input.enabledPlatforms?.gemini ?? true,
    claude: input.enabledPlatforms?.claude ?? true,
    grok: input.enabledPlatforms?.grok ?? true,
    meta: input.enabledPlatforms?.meta ?? true,
  };

  return {
    borderThickness,
    animationSpeed,
    glowIntensity,
    enabledPlatforms,
  };
}
