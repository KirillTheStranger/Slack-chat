import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const runApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));

  root.render(await init());
};

runApp();
