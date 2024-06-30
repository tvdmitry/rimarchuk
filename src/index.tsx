import ReactDOM from 'react-dom/client'

import { App } from './layout/App'
import { PreloadPodcast } from './modules/media/PreloadPodcast'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('api_token');
});

root.render(
    <>
        <PreloadPodcast />
        <App />
    </>
);
