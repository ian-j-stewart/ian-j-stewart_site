export const themeLabels: Record<string, string> = {
  'ai-compute-emerging-technology': 'AI, Compute and Emerging Technology',
  'nuclear-technology-strategic-autonomy': 'Nuclear Technology and Strategic Autonomy',
  'technology-control-economic-statecraft': 'Technology Control and Economic Statecraft',
};

export function getThemeLabel(slug: string): string {
  return themeLabels[slug] ?? slug;
}

export function getThemeSlugs(): string[] {
  return Object.keys(themeLabels);
}

export function getThemeLabelsList(): { slug: string; label: string }[] {
  return Object.entries(themeLabels).map(([slug, label]) => ({ slug, label }));
}
