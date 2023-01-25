import { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Input, Form, Row, Col, Card, Spin } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useBooks } from 'providers/ProvideBook';
import debounce from 'lodash.debounce';
import { useQuery } from 'hooks';
import SearchResult from 'components/SearchResult';

const { Title, Paragraph } = Typography;

export default function Home() {
  const { bookStorage, loadBooks, searchWord, resetBooks } = useBooks();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const query = useQuery();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const debouncedChangeHandler = useCallback(debounce(searchWord, 300), [searchWord]);

  const onInputChange = useCallback(
    e => {
      const value = e.currentTarget.value;

      setInputValue(value);
      query.set('word', value);

      if (value) {
        debouncedChangeHandler(value);
      } else {
        resetBooks();
      }

      window.history.replaceState(null, null, '?'.concat(query.toString()));
    },
    [debouncedChangeHandler, resetBooks]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  useEffect(() => {
    const value = query.get('word');
    if (value) {
      setInputValue(value);
      debouncedChangeHandler(value);
    }
  }, [debouncedChangeHandler]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <Row gutter={26}>
        <Col xs={24} sm={24} md={24} lg={4} xl={6}></Col>
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
              <Paragraph>
                Սա ազատ ելակոդով բառարանների շտեմարան է։ Այն բաղկացած է հետեւյալ բառարաններից՝
              </Paragraph>
              {bookStorage.loading ? (
                <Spin />
              ) : (
                <ul style={{ paddingInlineStart: '25px' }}>
                  {bookStorage.books.map(book => (
                    <li key={book._id}>{book.name}</li>
                  ))}
                </ul>
              )}
            </Card>
          ) : (
            <SearchResult />
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={6}></Col>
      </Row>
    </div>
  );
}
