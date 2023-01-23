import Home from './pages/Home';
import { Layout, Row, Col, Space } from 'antd';
import Logo from 'assets/images/logo.svg';

const Container = props => {
  return (
    <div style={{ maxWidth: 1500, margin: '0 auto', padding: '0 30px' }}>{props.children}</div>
  );
};

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: '#fff', padding: 0 }}>
        <Container>
          <Row align="middle" gutter={20}>
            <Col flex="auto">
              <img src={Logo} alt="Բառարան.հայ" width="40" />
            </Col>
            <Col style={{ lineHeight: 1 }}></Col>
          </Row>
        </Container>
      </Layout.Header>
      <Layout.Content style={{ padding: '40px 0' }}>
        <Container>
          <Home />
        </Container>
      </Layout.Content>
    </Layout>
  );
}

export default App;
