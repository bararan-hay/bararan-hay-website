import { useEffect, useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { useDics } from 'providers/ProvideDics';

const Item = ({ dictionary }) => {
  const { storage, enable, disable } = useDics();
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
          margin: '0 0 12px 0',
          alignItems: 'flex-start'
        }}
      >
        <span style={{ top: -5, position: 'relative' }}>{dictionary.name}</span>
      </Checkbox>
    </Spin>
  );
};

export default function List() {
  const { storage, load } = useDics();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      {storage.dics.map(dictionary => (
        <Item key={dictionary.key} dictionary={dictionary} />
      ))}
    </Spin>
  );
}
