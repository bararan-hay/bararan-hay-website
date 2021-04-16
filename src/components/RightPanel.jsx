import { Typography, Card, Space } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
const { Title, Link } = Typography;

export default function RightPanel() {
  return (
    <Card
      style={{ marginBottom: 12 }}
      bordered={false}
      title={
        <Title level={5} style={{ lineHeight: 1 }}>
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
  );
}
