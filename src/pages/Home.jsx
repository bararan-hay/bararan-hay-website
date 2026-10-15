import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useBooks } from 'providers/ProvideBook';
import debounce from 'lodash.debounce';
import { useQuery } from 'hooks';
import SearchResult, { Perforation } from 'components/SearchResult';
import Postmark from 'components/Postmark';
import { Rosette, Ribbon, Microtext } from 'components/Engraving';
import { splitName, stampFor } from 'lib/issue';

function Welcome() {
  const { bookStorage, loadBooks } = useBooks();
  const { list } = bookStorage;

  return (
    <div className="welcome">
      <div className="welcome__intro">
        <h2 className="welcome__title">Բարի գալուստ</h2>
        <p className="welcome__text">
          Սա ազատ ելակոդով բառարանների շտեմարան է։ Այն բաղկացած է հետեւյալ բառարաններից՝
        </p>
        {list.length > 0 && <p className="welcome__count">{list.length} բառարան, մեկ որոնում</p>}
      </div>

      {bookStorage.loading && list.length === 0 ? (
        <Perforation label="Բեռնում ենք բառարանների ցանկը…" />
      ) : bookStorage.error && list.length === 0 ? (
        <div className="notice">
          <p className="notice__text">Բառարանների ցանկը չհաջողվեց բեռնել։</p>
          <button type="button" className="button" onClick={loadBooks}>
            Կրկին փորձել
          </button>
        </div>
      ) : (
        <ul className="sheet" aria-label="Բառարաններ">
          {list.map((book, index) => {
            const stamp = stampFor(list, book._id);
            const { title, source } = splitName(book.name);
            return (
              <li
                key={book._id}
                className={`sheet__stamp ink-${stamp.ink}`}
                style={{ '--i': index }}
              >
                <div className="sheet__frame">
                  <span className="sheet__numeral" aria-hidden="true">
                    {stamp.numeral}
                  </span>
                  <span className="sheet__title">{title}</span>
                  {source && <span className="sheet__source">{source}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Home() {
  const { bookStorage, loadBooks, searchWord, resetBooks } = useBooks();
  const [inputValue, setInputValue] = useState('');
  const [searched, setSearched] = useState('');
  const inputRef = useRef();
  const query = useQuery();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce(value => {
        setSearched(value);
        searchWord(value);
      }, 300),
    [searchWord]
  );

  const updateValue = useCallback(
    value => {
      setInputValue(value);
      query.set('word', value);

      if (value) {
        debouncedChangeHandler(value);
      } else {
        debouncedChangeHandler.cancel();
        setSearched('');
        resetBooks();
      }

      window.history.replaceState(null, null, '?'.concat(query.toString()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedChangeHandler, resetBooks]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  useEffect(() => {
    const value = query.get('word');
    if (value) {
      setInputValue(value);
      debouncedChangeHandler(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedChangeHandler]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const found = bookStorage.books.filter(book => book.words?.length > 0).length;
  const showPostmark = inputValue && searched && !bookStorage.loading && !bookStorage.error && found > 0;

  return (
    <>
      <header className={`band${showPostmark ? ' band--cancelled' : ''}`}>
        <Ribbon className="band__ribbon" />
        <Rosette className="band__rosette" />
        <Microtext className="band__micro" />
        <div className="band__inner">
          <h1 className="wordmark">
            <a href="./" className="wordmark__link">
              Բառարան.հայ
            </a>
            <span className="wordmark__sub">Հայերեն առցանց բառարաններ</span>
          </h1>

          <form className="search" role="search" onSubmit={e => e.preventDefault()}>
            <label htmlFor="word" className="visually-hidden">
              Որոնել բառը բոլոր բառարաններում
            </label>
            <input
              id="word"
              ref={inputRef}
              className="search__input"
              type="search"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              value={inputValue}
              placeholder="Մուտքագրեք բառը…"
              onChange={e => updateValue(e.currentTarget.value)}
              onKeyDown={e => {
                if (e.key === 'Escape' && inputValue) {
                  e.preventDefault();
                  updateValue('');
                }
              }}
            />
            {inputValue ? (
              <button
                type="button"
                className="search__clear"
                aria-label="Մաքրել"
                onClick={() => {
                  updateValue('');
                  inputRef.current?.focus();
                }}
              >
                <ClearIcon />
              </button>
            ) : (
              <span className="search__hint" aria-hidden="true">
                {bookStorage.list.length ? `${bookStorage.list.length} բառարան` : ''}
              </span>
            )}
          </form>
        </div>
        {showPostmark && <Postmark key={searched} word={searched} count={found} />}
      </header>

      <main className="page">
        {!inputValue ? <Welcome /> : <SearchResult onRetry={() => searchWord(inputValue)} />}
      </main>
    </>
  );
}

