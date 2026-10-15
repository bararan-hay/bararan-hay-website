import { useBooks } from 'providers/ProvideBook';
import { splitName, stampFor } from 'lib/issue';

export function Stamp({ numeral, ink, size = 'md' }) {
  return (
    <span className={`stamp stamp--${size} ink-${ink}`} aria-hidden="true">
      <span className="stamp__frame">{numeral}</span>
    </span>
  );
}

export function Perforation({ label }) {
  return (
    <div className="perforation" role="status">
      <span className="visually-hidden">{label}</span>
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} style={{ animationDelay: `${i * 60}ms` }} />
      ))}
    </div>
  );
}

function Entry({ item }) {
  return (
    <div className="entry">
      <span className="entry__word">{item.title}</span>{' '}
      <span
        className="entry__text"
        dangerouslySetInnerHTML={{ __html: item.description.replace(/\\n/g, '\n') }}
      />
    </div>
  );
}

const SearchResult = ({ onRetry }) => {
  const { bookStorage } = useBooks();
  const { list, results, searching, searchError } = bookStorage;

  if (searchError) {
    return (
      <div className="notice">
        <div className="handstamp handstamp--error" aria-hidden="true">
          ԽԱՓԱՆՈՒՄ
        </div>
        <p className="notice__text">Բառարանների սերվերը չպատասխանեց։ Ստուգեք կապը եւ փորձեք կրկին։</p>
        <button type="button" className="button" onClick={onRetry}>
          Կրկին որոնել
        </button>
      </div>
    );
  }

  // Nothing to show yet: the first search for this word is still on its way.
  if (!results) {
    return <Perforation label="Որոնում ենք բառարաններում…" />;
  }

  // While a newer search runs, the previous answer stays in place, dimmed.
  const stateClass = `results-state${searching ? ' results-state--stale' : ''}`;
  const indexed = results.map((book, index) => ({ book, stamp: stampFor(list, book._id, index) }));
  const found = indexed.filter(({ book }) => book.words?.length > 0);
  const missing = indexed.filter(({ book }) => !book.words?.length);

  if (found.length === 0) {
    return (
      <div className={stateClass} aria-busy={searching}>
        <div className="notice">
          <div className="handstamp" aria-hidden="true">
            ՉԿԱ
          </div>
          <p className="notice__text">Ընտրված բառարաններում այս բառը չկա</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${stateClass} results`} aria-busy={searching}>
      <nav className="rail" aria-label="Բառարաններ, որոնցում բառը գտնվել է">
        <p className="rail__title">
          Գտնվել է {found.length} բառարանում
        </p>
        <ul className="rail__list">
          {found.map(({ book, stamp }) => {
            return (
              <li key={book._id}>
                <a className="rail__link" href={`#book-${book._id}`}>
                  <Stamp {...stamp} size="sm" />
                  <span>{splitName(book.name).title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="column">
        {found.map(({ book, stamp }) => {
          const { title, source } = splitName(book.name);
          return (
            <section key={book._id} id={`book-${book._id}`} className={`book ink-${stamp.ink}`}>
              <header className="book__head">
                <Stamp {...stamp} />
                <div>
                  <h2 className="book__title">{title}</h2>
                  {source && <p className="book__source">{source}</p>}
                </div>
              </header>
              <div className="book__entries">
                {book.words.map((item, index) => (
                  <Entry key={item._id || index} item={item} />
                ))}
              </div>
            </section>
          );
        })}

        {missing.length > 0 && (
          <aside className="missing">
            <h2 className="missing__title">Այս բառը չկա հետեւյալ բառարաններում</h2>
            <ul className="missing__list">
              {missing.map(({ book, stamp }) => {
                return (
                  <li key={book._id}>
                    <Stamp {...stamp} size="xs" />
                    {splitName(book.name).title}
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
