import { Typography, Card, Skeleton, Empty } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useDictionaries } from 'providers/ProvideDictionary';

const { Title } = Typography;

const SearchResult = () => {
  const { dictionaryStorage } = useDictionaries();

  const dictionaries = dictionaryStorage.dictionaries.filter(r => r.dictionaries.length > 0);

  return (
    <>
      {dictionaryStorage.loading ? (
        <Card bordered={false}>
          <Skeleton active />
        </Card>
      ) : dictionaries.length === 0 ? (
        <Card bordered={false}>
          <Empty
            style={{ paddingTop: 55 }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Ընտրված բառարաններում այս բառը չկա"
          />
        </Card>
      ) : (
        dictionaries
          .filter(r => r.dictionaries.length > 0)
          .map(result => (
            <Card key={result._id} bordered={false} style={{ marginBottom: 5 }}>
              <Title level={5}>
                <BookOutlined style={{ marginRight: 8 }} />
                {result.name}
              </Title>
              <ul style={{ padding: '10px 0 0 25px' }}>
                {result.dictionaries.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: 10,
                      whiteSpace: 'pre-line',
                      lineHeight: 1.7
                    }}
                  >
                    <span>{item.keyword} </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.description.replace(/\\n/g, '\n')
                      }}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          ))
      )}
    </>
  );
};

export default SearchResult;
