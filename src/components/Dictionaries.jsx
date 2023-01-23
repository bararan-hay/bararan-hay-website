import { useEffect, useState } from 'react';
import { List, Spin, Card, Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { useBooks } from 'providers/ProvideBook';

const { Title } = Typography;

export default function Dictionaries() {
  const { bookStorage, loadBooks } = useBooks();

  return (
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
      <Spin spinning={bookStorage.loading}>
        <List size="small">
          {bookStorage.books.map(book => (
            <List.Item key={book._id}>{book.name}</List.Item>
          ))}
        </List>
      </Spin>
    </Card>
  );
}
