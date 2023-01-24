import Home from './pages/Home';
import { Layout, Typography, Space } from 'antd';
import Logo from 'assets/images/logo.svg';
import GitHubButton from 'react-github-btn';

const Container = props => {
  return (
    <div style={{ maxWidth: 1500, margin: '0 auto', padding: '0 30px', ...props.style }}>
      {props.children}
    </div>
  );
};

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: '#fff', padding: 0 }}>
        <Container style={{ textAlign: 'center' }}>
          <img src={Logo} alt="Բառարան.հայ" width="40" />
        </Container>
      </Layout.Header>
      <Layout.Content style={{ padding: '40px 0' }}>
        <Container>
          <Home />
        </Container>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Space align="center" wrap size="large">
          <GitHubButton
            href="https://github.com/bararan-hay/bararan-hay-website"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star buttons/github-buttons on GitHub"
          >
            Star
          </GitHubButton>
          <Typography.Text>
            Հեղինակ՝{' '}
            <a target="_blank" href="https://tigransimonyan.com/about">
              Տիգրան Սիմոնյան
            </a>
          </Typography.Text>
          <a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc/4.0/">
            <img
              alt="Creative Commons License"
              src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
            />
          </a>
        </Space>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
