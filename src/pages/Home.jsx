import { useState, useEffect, useRef } from 'react';
import { Typography, Input, Form, Row, Col, Card } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useDictionaries } from 'providers/ProvideDictionary';
import { useBooks } from 'providers/ProvideBook';
import { useQuery } from 'hooks';
import SearchResult from 'components/SearchResult';

const { Title } = Typography;

export default function Home() {
  const { bookStorage, loadBooks } = useBooks();
  const { search, resetDictionary } = useDictionaries();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const query = useQuery();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const onInputChange = e => {
    const value = e.currentTarget.value;
    setInputValue(value);
    query.set('word', value);
    if (value) {
      search(value);
    } else {
      resetDictionary();
    }
    window.history.replaceState(null, null, '?'.concat(query.toString()));
  };

  useEffect(() => {
    const value = query.get('word');
    if (value) {
      search(value);
      setInputValue(value);
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <Row gutter={26}>
        <Col xs={24} sm={24} md={24} lg={8} xl={6}></Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={12} style={{ marginBottom: 12 }}>
          <Form size="large" style={{ marginBottom: 15 }}>
            <Input
              allowClear
              value={inputValue}
              ref={inputRef}
              style={{ height: '50px', border: 'none', padding: '10px 20px' }}
              placeholder={'Մուտքագրեք բառը...'}
              onChange={onInputChange}
            />
          </Form>
          {!inputValue ? (
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
          ) : (
            <SearchResult />
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={6}></Col>
      </Row>
    </div>
  );
}
