import Home from './pages/Home';
import { Layout } from 'antd';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ color: '#fff' }}></Layout.Header>
      <Layout.Content
        style={{
          margin: '3% auto',
          padding: '0 20px',
          width: '100%',
          maxWidth: '1200px'
        }}
      >
        <Home />
      </Layout.Content>
    </Layout>
  );
}

export default App;
