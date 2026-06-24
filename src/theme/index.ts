export const colors = {
  background: '#FFFFFF',
  text: '#111111',
  textSecondary: '#6B6B6B',
  divider: '#E8E8E8',
  accent: '#111111',
  danger: '#C62828',
  glassFallback: 'rgba(255, 255, 255, 0.92)',
  backdrop: 'rgba(0, 0, 0, 0.35)',
  categoryBg: '#F2F2F2',
  tabInactive: '#B0B0B0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  greeting: {
    fontSize: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.5,
  },
  periodLabel: {
    fontSize: 17,
    fontWeight: '400' as const,
  },
  periodAmount: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  comparison: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
};

export const radii = {
  sheet: 20,
  button: 32,
  category: 20,
  input: 12,
};

export const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };
