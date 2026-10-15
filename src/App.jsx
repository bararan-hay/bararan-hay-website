import Home from './pages/Home';
import GitHubButton from 'react-github-btn';
import { Microtext } from 'components/Engraving';

function App() {
  return (
    <div className="app">
      <Home />
      <footer className="footer">
        <Microtext className="footer__micro" text="ԱԶԱՏ ԵԼԱԿՈԴ" />
        <div className="footer__inner">
          <p className="footer__mark">
            Բառարան.հայ
            <span>Ազատ ելակոդով բառարանների շտեմարան</span>
          </p>
          <p className="footer__credit">
            Հեղինակ՝{' '}
            <a target="_blank" rel="noreferrer" href="https://tigransimonyan.com">
              Տիգրան Սիմոնյան
            </a>
          </p>
          <p className="footer__license">
            Բովանդակությունը՝{' '}
            <a
              rel="license noreferrer"
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
            >
              CC BY-NC 4.0
            </a>
          </p>
          <div className="footer__github">
            <GitHubButton
              href="https://github.com/bararan-hay/bararan-hay-website"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star bararan-hay/bararan-hay-website on GitHub"
            >
              Star
            </GitHubButton>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
