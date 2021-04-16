import { useEffect, useState } from 'react';
import { Checkbox, Spin, Card, Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { useDictionaries } from 'providers/ProvideDictionary';

const { Title } = Typography;

const Item = ({ dictionary }) => {
  const { storage, enable, disable } = useDictionaries();
  const [loading, setLoading] = useState(false);

  const onCheck = e => {
    if (e.target.checked) {
      setLoading(true);
      enable(dictionary).then(response => {
        setLoading(false);
        return response;
      });
    } else {
      disable(dictionary);
    }
  };

  return (
    <Spin spinning={loading}>
      <Checkbox
        onChange={onCheck}
        checked={storage.checkedKeys[dictionary.key]}
        style={{
          display: 'flex',
          margin: '0 0 14px 0',
          alignItems: 'flex-start'
        }}
      >
        <span style={{ top: -1, position: 'relative' }}>{dictionary.name}</span>
      </Checkbox>
    </Spin>
  );
};

export default function Dictionaries() {
  const { storage, load } = useDictionaries();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load().then(() => {
      setLoading(false);
    });
  }, []);

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
      <Spin spinning={loading}>
        {storage.dictionaries.map(dictionary => (
          <Item key={dictionary.key} dictionary={dictionary} />
        ))}
      </Spin>
    </Card>
  );
}
