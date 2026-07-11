import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';
import { colors, homeLayout, radii, typography } from '../theme';

interface SpendingGaugeProps {
  percent: number;
}

const WIDTH = homeLayout.cardWidth;
const HEIGHT = 58;
const CX = WIDTH / 2;
const CY = HEIGHT + 8;
const RADIUS = 118;
const STROKE = 3.5;

/** Polar coords with mathematical Y (up = negative screen Y) so π→0 sweeps the top arc. */
function polar(angle: number, radius: number = RADIUS) {
  return {
    x: CX + radius * Math.cos(angle),
    y: CY - radius * Math.sin(angle),
  };
}

function describeArc(startAngle: number, endAngle: number): string {
  const start = polar(startAngle);
  const end = polar(endAngle);
  const delta = ((startAngle - endAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  const largeArc = delta > Math.PI ? 1 : 0;
  // Clockwise in screen space follows decreasing mathematical angle through the top.
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function SpendingGauge({ percent }: SpendingGaugeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const startAngle = Math.PI;
  const endAngle = 0;
  const progressAngle = startAngle - (clamped / 100) * Math.PI;

  const trackPath = useMemo(() => describeArc(startAngle, endAngle), []);
  const progressPath = useMemo(
    () => (clamped <= 0 ? '' : describeArc(startAngle, progressAngle)),
    [clamped, progressAngle],
  );

  const pillPos = polar(progressAngle, RADIUS);
  const radialLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i <= 12; i += 1) {
      const angle = Math.PI - (i / 12) * Math.PI;
      const inner = polar(angle, 42);
      const outer = polar(angle, RADIUS + 4);
      lines.push({ x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y });
    }
    return lines;
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={WIDTH} height={HEIGHT} style={styles.svg}>
        <G>
          {radialLines.map((line, index) => (
            <Line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={colors.gaugeRadial}
              strokeWidth={0.4}
              strokeOpacity={0.55}
            />
          ))}
          <Circle
            cx={CX}
            cy={CY}
            r={RADIUS - 36}
            stroke={colors.gaugeRadial}
            strokeWidth={0.4}
            fill="none"
            opacity={0.45}
          />
          <Circle
            cx={CX}
            cy={CY}
            r={RADIUS - 58}
            stroke={colors.gaugeRadial}
            strokeWidth={0.4}
            fill="none"
            opacity={0.35}
          />
          <Path d={trackPath} stroke={colors.gaugeTrack} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
          {progressPath ? (
            <Path
              d={progressPath}
              stroke={colors.progress}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
            />
          ) : null}
        </G>
      </Svg>
      {clamped > 0 ? (
        <View
          style={[
            styles.pill,
            {
              left: pillPos.x - 14.5,
              top: Math.max(0, pillPos.y - 10),
            },
          ]}
        >
          <Text style={styles.pillText}>{clamped}%</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  pill: {
    position: 'absolute',
    backgroundColor: colors.progress,
    borderWidth: 1.5,
    borderColor: colors.background,
    borderRadius: radii.pill,
    paddingHorizontal: 6,
    paddingVertical: 3,
    minWidth: 29,
    alignItems: 'center',
  },
  pillText: {
    ...typography.pill,
    color: colors.background,
  },
});
