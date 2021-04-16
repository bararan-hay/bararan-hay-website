import { useState, useEffect } from 'react';
import { Typography, Input, Form, Row, Col, Card, Empty, Space } from 'antd';
import {
  BookOutlined,
  BulbOutlined,
  LinkOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { useDics } from 'providers/ProvideDics';
import { elasticSearch } from 'helper/dictionary';
import DicsList from 'components/DicsList';

const { Title, Link } = Typography;

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
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
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
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          style={{ marginBottom: 12 }}
        >
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
              հիման վրա։ Բառարան ընտրելով դուք ներբեռնում եք այն Ձեր դիտարկիչի
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
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <Card
            style={{ marginBottom: 12 }}
            bordered={false}
            title={
              <Title level={5} strong style={{ lineHeight: 1 }}>
                <LinkOutlined style={{ marginRight: 8 }} />
                Օգտակար հղումներ
              </Title>
            }
          >
            <Space direction="vertical">
              <Link
                target="_blank"
                href="https://hy.wikibooks.org/wiki/%D5%80%D5%A1%D5%B5%D5%A5%D6%80%D5%A5%D5%B6%D5%B8%D6%82%D5%B4_%D5%BF%D5%A1%D6%80%D5%A1%D5%AE%D5%BE%D5%A1%D5%AE_%D5%BD%D5%AD%D5%A1%D5%AC%D5%B6%D5%A5%D6%80"
              >
                Հայերենում տարածված սխալներ
              </Link>
              <Link
                target="_blank"
                href="https://hy.wikipedia.org/wiki/%D5%8E%D5%AB%D6%84%D5%AB%D5%BA%D5%A5%D5%A4%D5%AB%D5%A1:%D4%BC%D5%A5%D5%A6%D5%BE%D5%AB_%D5%AF%D5%B8%D5%B4%D5%AB%D5%BF%D5%A5%D5%AB_%D5%B0%D5%B8%D6%80%D5%A4%D5%B8%D6%80%D5%A1%D5%AF%D5%B6%D5%A5%D6%80"
              >
                Լեզվի կոմիտեի հորդորակներ
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
