import { Button, Typography } from 'antd';
import Container from 'components/layout/container';

export function NotFound() {
  return (
    <Container className="items-center">
      <Typography.Title>404 Not Found</Typography.Title>
      <Button size="small" href="/">
        Go back to home page
      </Button>
    </Container>
  );
}
