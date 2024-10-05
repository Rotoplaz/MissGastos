
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';

export default function Index() {
  const [counter, setCounter] = useState(0);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      <Text category='h1'>HOME</Text>
      <Text category='p1' style={{marginVertical: 10}}>{counter}</Text>
      <Button onPress={() => setCounter(counter + 1)} appearance='outline'>
        +1
      </Button>

    </Layout>
  );
}
