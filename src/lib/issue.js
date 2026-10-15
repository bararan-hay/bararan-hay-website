// Each dictionary is a stamp in one issue: an Armenian letter-numeral and an ink.

const UNITS = ['', 'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ'];
const TENS = ['', 'Ժ', 'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ'];
const HUNDREDS = ['', 'Ճ', 'Մ', 'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ'];

export const INKS = ['blue', 'oxblood', 'green', 'ochre', 'violet', 'teal', 'sepia', 'slate'];

export function armenianNumeral(n) {
  if (n < 1 || n > 999) return String(n);
  return HUNDREDS[Math.floor(n / 100)] + TENS[Math.floor(n / 10) % 10] + UNITS[n % 10];
}

// "Բացատրական բառարան (Հայկազեան)" -> { title: 'Բացատրական բառարան', source: 'Հայկազեան' }
export function splitName(name = '') {
  const match = name.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  return match ? { title: match[1], source: match[2] } : { title: name, source: null };
}

// Search results come back in collection order, so their own index is a stable
// fallback while the dictionary list is still loading.
export function stampFor(list, id, fallbackIndex = 0) {
  const index = list.findIndex(book => book._id === id);
  const position = index === -1 ? fallbackIndex : index;
  return {
    numeral: armenianNumeral(position + 1),
    ink: INKS[position % INKS.length]
  };
}
