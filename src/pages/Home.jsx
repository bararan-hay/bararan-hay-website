import { useState, useEffect } from 'react';
import { Typography, Input, Form, Row, Col, Card, Empty, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useDics } from 'providers/ProvideDics';
import DicsList from '../components/DicsList';

import GitHubButton from 'react-github-btn';

const { Title, Paragraph } = Typography;

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
      if (storage.checkedKeys[dictionary.key] && text) {
        // const pattern = `^${text}.+\n`;
        const pattern = `^(?:.+\\|\\s*)?${text}.*\n.+\n`;
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
  }, [search, storage.checkedKeys]);

  return (
    <div>
      <Row gutter={20}>
        <Col md={7}>
          <Card
            style={{ marginBottom: 12 }}
            bordered={false}
            title={
              <Title level={5} strong style={{ lineHeight: 1 }}>
                Ընտրեք բառարանը
              </Title>
            }
          >
            <DicsList />
          </Card>
          <Space align="start">
            <GitHubButton
              href="https://github.com/bararan-hay/bararan-hay-website"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-size="large"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star bararan-hay/bararan-hay-website on GitHub"
            >
              Աստղեր
            </GitHubButton>
          </Space>
        </Col>
        <Col md={14}>
          <Form size="large">
            <Input
              allowClear
              autoFocus
              value={search}
              style={{ height: '50px', border: 'none', padding: '10px 20px' }}
              placeholder="Մուտքագրեք բառը..."
              onChange={e => setSearch(e.target.value)}
            />
          </Form>
          <Paragraph
            style={{
              borderRadius: 2,
              background: '#fff',
              padding: '20px 20px',
              margin: '10px 0'
            }}
          >
            <Title level={5}>Բարեւ սիրելի օգտատեր :)</Title>
            Այս կայքն աշխատում է{' '}
            <a href="https://github.com/bararan-hay" target="_blank">
              բաց ելակոդով բառարանների
            </a>{' '}
            հիման վրա։ Բառարան ընտրելով դու ներբեռնում ես այն քո դիտարկիչի
            հիշողության մեջ որտեղից էլ հետագայում կատարվում է որոնումը։
          </Paragraph>

          {isEmpty && (
            <div
              style={{
                borderRadius: 2,
                background: '#fff',
                padding: '20px 20px',
                margin: '10px 0'
              }}
            >
              <Empty
                style={{ paddingTop: 55 }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Ընտրված բառարաններում այս բառը չկա ։("
              />
            </div>
          )}
          <div style={{}}>
            {results.map(result => (
              <div
                key={result.key}
                style={{
                  borderRadius: 2,
                  background: '#fff',
                  padding: '20px 20px',
                  margin: '10px 0'
                }}
              >
                <Title level={5}>
                  <BookOutlined style={{ marginRight: 8 }} />
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
