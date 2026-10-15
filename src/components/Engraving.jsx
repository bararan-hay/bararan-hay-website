import { memo } from 'react';

const TAU = Math.PI * 2;

// Interlaced guilloche rings: rho(theta) = base + amp * sin(lobes * theta + phase)
function ring(cx, cy, base, amp, lobes, phase, steps = 720) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const rho = base + amp * Math.sin(lobes * t + phase);
    const x = cx + rho * Math.cos(t);
    const y = cy + rho * Math.sin(t);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2);
  }
  return d + 'Z';
}

function wave(width, baseY, amp, length, phase, amp2, length2) {
  let d = '';
  for (let x = 0; x <= width; x += 6) {
    const y =
      baseY + amp * Math.sin((x / length) * TAU + phase) + amp2 * Math.sin((x / length2) * TAU);
    d += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(2);
  }
  return d;
}

const layers = [
  { base: 96, amp: 12, lobes: 21, count: 18 },
  { base: 64, amp: 9, lobes: 15, count: 14 },
  { base: 36, amp: 7, lobes: 9, count: 10 }
];

const rosettePaths = layers.flatMap(({ base, amp, lobes, count }) =>
  Array.from({ length: count }, (_, i) => ring(120, 120, base, amp, lobes, (i / count) * TAU))
);

const ribbonPaths = Array.from({ length: 22 }, (_, i) =>
  wave(1440, 250 + i * 1.6, 18, 520, i * 0.22, 9, 1310)
);

export const Rosette = memo(function Rosette({ className }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="0.45">
        {rosettePaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <circle cx="120" cy="120" r="112" strokeWidth="0.8" />
        <circle cx="120" cy="120" r="116" strokeWidth="0.4" />
        <circle cx="120" cy="120" r="22" strokeWidth="0.8" />
      </g>
    </svg>
  );
});

export const Ribbon = memo(function Ribbon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 330"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
        {ribbonPaths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
});

export function Microtext({ text = 'ԲԱՌԱՐԱՆ.ՀԱՅ', className }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: 24 }, () => text).join(' · ')}
    </div>
  );
}
