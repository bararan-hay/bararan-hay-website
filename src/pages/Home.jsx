import { useState, useEffect } from 'react';
import { Typography, Input, Form, Row, Col, Card, Empty, Divider } from 'antd';
import { BookFilled } from '@ant-design/icons';
import { useDics } from 'providers/ProvideDics';
import DicsList from '../components/DicsList';

const { Title } = Typography;

export default function Home() {
  const { storage } = useDics();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const isEmpty = !!search.trim() && results.length === 0;

  useEffect(() => {
    const array = [];
    const resultsMaxCount = 4;
    storage.dics.forEach(dictionary => {
      const text = search
        .trim()
        .replace(/\{|\}|\[|\]|\\|\(|\)/g, '')
        .replace(/և|եւ/g, '(և|եւ)');
      if (storage.checkeds.includes(dictionary.key) && text) {
        const pattern = `^${text}.+\n`;
        const regexp = new RegExp(pattern, 'gim');
        const lines = dictionary.data.match(regexp);
        if (lines) {
          array.push({
            name: dictionary.name,
            count: lines.length,
            key: dictionary.key,
            lines: lines.slice(0, resultsMaxCount)
          });
        }
      }
    });
    setResults(array);
  }, [search, storage.checkeds]);

  return (
    <div>
      <Row gutter={20}>
        <Col md={7}>
          <Card
            bordered
            title={
              <Title level={5} strong style={{ lineHeight: 1 }}>
                Ընտրեք բառարանը
              </Title>
            }
          >
            <DicsList />
          </Card>
        </Col>
        <Col md={14}>
          <Form size="large">
            <Input
              allowClear
              value={search}
              disabled={storage.loading}
              style={{ height: '50px' }}
              placeholder="Մուտքագրեք բառը..."
              onChange={e => setSearch(e.target.value)}
            />
          </Form>
          {isEmpty && (
            <Empty
              style={{ paddingTop: 55 }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Ընտրված բառարաններում այդ բառը չկա ։("
            />
          )}
          <div style={{}}>
            {results.map(result => (
              <div
                key={result.key}
                style={{
                  background: '#fff',
                  padding: '10px 10px',
                  margin: '10px 0'
                }}
              >
                <Title level={5}>
                  <BookFilled style={{ marginRight: 8 }} />
                  {result.name}
                </Title>
                <ul style={{ padding: '10px 0 0 25px' }}>
                  {result.lines.map((line, index) => (
                    <li
                      dangerouslySetInnerHTML={{
                        __html: line.replace(/\\n/g, '\n')
                      }}
                      key={index}
                      style={{
                        marginBottom: 10,
                        whiteSpace: 'pre-line'
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
