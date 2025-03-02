import { Button } from "../../components/button/button";
import { Example } from "./components/example";

export default function HomePage() {
  return (
    <div>
      <p style={{ color: "var(--foreground-default" }}>HomePage</p>
      <Example />
      <Button type="warning" size="small">
        Hello World
      </Button>
    </div>
  );
}
