import dva from 'dva';
import { ipcRenderer } from 'electron';
import Message from 'antd/lib/message';

import RouterConfig from './router';
import project from './models/project';
import layout from './models/layout';
import task from './models/task';
import init from './models/init';

import 'antd/dist/antd.min.css';
// import 'uxcore/assets/blue.css';

import '../assets/styles/base.css';
import '../assets/styles/animation.css';
import '../assets/styles/site.less';

if (process.platform === 'win32') {
  import('../assets/styles/isWin.less');
}

ipcRenderer.on('MAIN_ERR', (event, msg) => {
  Message.error(msg, /* duration */1.5);
});


// 1. Initialize
const app = dva({
  onError(e) {
    // Message.error(e.message, /* duration */1.5);
    Message.error(e.stack, /* duration */1.5);
  },
});

// 2. Plugins

// 3. Model

app.model(project);
app.model(layout);
app.model(task);
app.model(init);


// 4. Router
app.router(RouterConfig);

// 5. Start
app.start('#root');
