export const colors = {
  background: '#FFFFFF',
  text: '#111111',
  textPrimary: '#0A0A0A',
  textSecondary: '#6B6B6B',
  textMuted: '#5D5D5D',
  textLabel: '#474747',
  textHint: '#999999',
  divider: '#E8E8E8',
  accent: '#111111',
  danger: '#C62828',
  glassFallback: 'rgba(255, 255, 255, 0.92)',
  backdrop: 'rgba(0, 0, 0, 0.35)',
  categoryBg: '#F2F2F2',
  tabInactive: '#B0B0B0',
  progress: '#59CC01',
  interactive: '#163300',
  cardBorder: '#F0F0F0',
  fab: '#2B2D43',
  gaugeTrack: '#E8E8E8',
  gaugeRadial: '#CED3C7',
  avatarPink: '#FFC6EE',
  avatarPeach: '#FFF3E6',
  avatarBlue: '#BBEBFF',
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
  title3: {
    fontSize: 20,
    fontWeight: '500' as const,
  },
  periodLabel: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  periodAmount: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
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
  normal: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  smallMedium: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  mini: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  micro: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 12,
  },
  scanLabel: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.12,
  },
  pill: {
    fontSize: 9,
    fontWeight: '400' as const,
    lineHeight: 12,
  },
};

export const radii = {
  sheet: 20,
  button: 32,
  category: 20,
  input: 12,
  card: 8,
  avatar: 11,
  pill: 37,
};

export const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };

export const homeLayout = {
  cardWidth: 254,
  cardHeight: 181,
  cardGap: 16,
  horizontalPadding: 15,
  greetingTop: 44,
  cardsTop: 88,
  listTop: 26,
  fabSize: 50,
  avatarSize: 22,
};

/** Hardcoded spending limits (IDR) matching Figma $20/$55 ratio at $55 limit. */
export const spendingLimits = {
  today: 55000,
  week: 55000,
  month: 220000,
};
