import { useState, useEffect } from 'react';
import { Typography, Input, Form, Row, Col, Card, Empty } from 'antd';
import {
  BookOutlined,
  BulbOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { useDics } from 'providers/ProvideDics';
import { elasticSearch } from 'helper/dictionary';
import DicsList from 'components/DicsList';

const { Title } = Typography;

export default function Home() {
  const { storage } = useDics();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const isEmpty = !!search.trim() && results.length === 0;

  useEffect(() => {
    setResults(elasticSearch(storage, search, 4));
  }, [search, storage.checkedKeys]);

  return (
    <div>
      <Row gutter={26}>
        <Col sm={24} md={9} lg={8} xl={6}>
          <Card
            style={{ marginBottom: 12 }}
            bordered={false}
            title={
              <Title level={5} strong style={{ lineHeight: 1 }}>
                <FileSearchOutlined style={{ marginRight: 8 }} />
                Ընտրեք բառարանը
              </Title>
            }
          >
            <DicsList />
          </Card>
        </Col>
        <Col sm={24} md={15} lg={16} xl={12}>
          <Form size="large" style={{ marginBottom: 15 }}>
            <Input
              allowClear
              autoFocus
              value={search}
              style={{ height: '50px', border: 'none', padding: '10px 20px' }}
              placeholder="Մուտքագրեք բառը..."
              onChange={e => setSearch(e.target.value)}
            />
          </Form>
          {!isEmpty && results.length === 0 && (
            <Card bordered={false}>
              <Title level={5}>
                <BulbOutlined style={{ marginRight: 8 }} />
                Բարեւ սիրելի օգտատեր
              </Title>
              Այս կայքն աշխատում է{' '}
              <a href="https://github.com/bararan-hay" target="_blank">
                բաց ելակոդով բառարանների
              </a>{' '}
              հիման վրա։ Բառարան ընտրելով դու ներբեռնում ես այն քո դիտարկիչի
              հիշողության մեջ որտեղից էլ հետագայում կատարվում է որոնումը։
            </Card>
          )}
          {isEmpty && (
            <Card bordered={false}>
              <Empty
                style={{ paddingTop: 55 }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Ընտրված բառարաններում այս բառը չկա ։("
              />
            </Card>
          )}
          {results.map(result => (
            <Card key={result.key} bordered={false} style={{ marginBottom: 5 }}>
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
                      whiteSpace: 'pre-line',
                      lineHeight: 1.7
                    }}
                  />
                ))}
              </ul>
            </Card>
          ))}
        </Col>
        <Col sm={24} md={24} lg={24} xl={6}></Col>
      </Row>
    </div>
  );
}
