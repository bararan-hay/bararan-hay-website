import Home from './pages/Home';
import { Layout, Row, Col } from 'antd';
import Logo from 'assets/images/logo.svg';
import GitHubButton from 'react-github-btn';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: '#fff' }}>
        <Row align="middle" gutter={20}>
          <Col flex="auto">
            <img src={Logo} alt="Բառարան.հայ" width="40" />
          </Col>
          <Col style={{ lineHeight: 1 }}>
            <GitHubButton
              href="https://github.com/bararan-hay/bararan-hay-website"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-size="large"
              data-show-count="true"
              aria-label="Star bararan-hay/bararan-hay-website on GitHub"
            >
              Աստղեր
            </GitHubButton>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: '40px 50px' }}>
        <Home />
      </Layout.Content>
    </Layout>
  );
}

export default App;
