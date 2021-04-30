import { useState, useEffect, useMemo, useRef } from 'react';
import { Typography, Input, Form, Row, Col, Card, Empty } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useDictionaries } from 'providers/ProvideDictionary';
import { elasticSearch } from 'helper/dictionary';
import { useQuery } from 'hooks';
import Dictionaries from 'components/Dictionaries';
import RightPanel from 'components/RightPanel';
import SearchResult from 'components/SearchResult';

const { Title } = Typography;

export default function Home() {
  const { storage } = useDictionaries();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const query = useQuery();

  const isEmpty = !!search.trim() && results.length === 0;

  const disabled = useMemo(() => !Object.values(storage.checkedKeys).some(Boolean), [
    storage.checkedKeys
  ]);

  const onSearch = e => {
    const value = e.target.value;
    setSearch(value);
    query.set('word', value);
    window.history.replaceState(null, null, '?'.concat(query.toString()));
  };

  useEffect(() => {
    setResults(elasticSearch(storage, search, 4));
  }, [search, storage.checkedKeys]);

  useEffect(() => {
    setSearch(query.get('word') || '');
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [storage.checkedKeys]);

  return (
    <div>
      <Row gutter={26}>
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <Dictionaries />
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={12} style={{ marginBottom: 12 }}>
          <Form size="large" style={{ marginBottom: 15 }}>
            <Input
              allowClear
              value={search}
              ref={inputRef}
              disabled={disabled}
              style={{ height: '50px', border: 'none', padding: '10px 20px' }}
              placeholder={disabled ? 'Ընտրեք բառարանը' : 'Մուտքագրեք բառը...'}
              onChange={onSearch}
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
              հիման վրա։ Բառարան ընտրելով դուք ներբեռնում եք այն Ձեր դիտարկիչի հիշողության մեջ
              որտեղից էլ հետագայում կատարվում է որոնումը։
            </Card>
          )}
          {isEmpty && (
            <Card bordered={false}>
              <Empty
                style={{ paddingTop: 55 }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Ընտրված բառարաններում այս բառը չկա"
              />
            </Card>
          )}
          <SearchResult results={results} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <RightPanel />
        </Col>
      </Row>
    </div>
  );
}
