import { Typography, Card } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SearchResult = ({ results }) => {
  return results.map(result => (
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
  ));
};

export default SearchResult;
