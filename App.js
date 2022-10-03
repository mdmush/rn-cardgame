import Navigator from './src/Navigator';
import {TailwindProvider} from 'tailwindcss-react-native';

const App = () => {
  return (
    <TailwindProvider>
      <Navigator />
    </TailwindProvider>
  );
};

export default App;
