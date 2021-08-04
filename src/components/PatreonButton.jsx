import { Button } from 'antd';
import patreon from 'assets/images/patreon-w.png';

export default function PatreonButton() {
  return (
    <Button
      style={{ backgroundColor: 'rgb(255, 66, 77)', color: 'white' }}
      type="link"
      shape="round"
      target="_blank"
      icon={<img width={16} src={patreon} style={{ marginRight: 8 }} />}
      href="https://www.patreon.com/bePatron?u=41176574"
    >
      Սատարել
    </Button>
  );
}
