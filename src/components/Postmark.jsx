const TAU = Math.PI * 2;

function cancelLine(index) {
  let d = '';
  for (let x = 0; x <= 300; x += 5) {
    const y = 14 + index * 16 + 5 * Math.sin((x / 64) * TAU);
    d += (x === 0 ? 'M' : 'L') + x + ' ' + y.toFixed(2);
  }
  return d;
}

const cancelPaths = Array.from({ length: 5 }, (_, i) => cancelLine(i));

function today() {
  const date = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

// A cancellation mark that lands on the band each time a lookup resolves.
export default function Postmark({ word, count }) {
  const ringText = `${word.toUpperCase()} · ԲԱՌԱՐԱՆ.ՀԱՅ · `;

  return (
    <div className="postmark" aria-hidden="true">
      <svg className="postmark__cancel" viewBox="0 0 300 96">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" filter="url(#ink)">
          {cancelPaths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      <svg className="postmark__seal" viewBox="0 0 220 220">
        <defs>
          <filter id="ink" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
            <feColorMatrix
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.75"
              result="gaps"
            />
            <feComposite in="SourceGraphic" in2="gaps" operator="in" result="inked" />
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="3" />
            <feDisplacementMap in="inked" scale="2.4" />
          </filter>
          <path id="postmark-ring" d="M110 110 m-80 0 a80 80 0 1 1 160 0 a80 80 0 1 1 -160 0" />
        </defs>
        <g filter="url(#ink)" fill="currentColor">
          <circle cx="110" cy="110" r="100" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="110" cy="110" r="64" fill="none" stroke="currentColor" strokeWidth="2" />
          <text className="postmark__ring">
            <textPath href="#postmark-ring" textLength="490" lengthAdjust="spacingAndGlyphs">
              {ringText.repeat(Math.max(1, Math.ceil(26 / ringText.length)))}
            </textPath>
          </text>
          <text className="postmark__date" x="110" y="106" textAnchor="middle">
            {today()}
          </text>
          <line x1="66" y1="118" x2="154" y2="118" stroke="currentColor" strokeWidth="1.5" />
          <text className="postmark__count" x="110" y="142" textAnchor="middle">
            {count} բառարան
          </text>
        </g>
      </svg>
    </div>
  );
}
