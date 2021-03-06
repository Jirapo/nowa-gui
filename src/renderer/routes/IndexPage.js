import React, { Component } from 'react';
import { connect } from 'dva';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import Welcome from './Welcome';

const { Sider } = Layout;

class IndexPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const holder = this.refs.container;
    holder.ondragover = () => false;
    holder.ondragleave = holder.ondragend = () => false;
    holder.ondrop = (e) => {
      e.preventDefault();
      for (let f of e.dataTransfer.files) {
        // console.log('File(s) you dragged here: ', f.path);
        dispatch({
          type: 'project/importProj',
          payload: { filePath: f.path }
        });
      }
      return false;
    };
  }
  render() {
    const { layout: { showConfig }, dispatch } = this.props;
    const rightSide = showConfig ? <ProjectDetail /> : <Welcome />;
    const toNewPane = () => {
      dispatch({
        type: 'layout/changeStatus',
        payload: {
          showConfig: false,
          showCreateForm: false,
          showInstallLog: false
        }
      });
      dispatch({
        type: 'project/changeStatus',
        payload: {
          current: {}
        }
      });
    };

    return (
      <div ref="container" style={{ height: '100%' }}>
      <Layout className="container">
        <Sider className="project-list">
        <header>
          <h2>Projects</h2>
          <div className="btn-grp">
            <Button type="ghost" size="small" onClick={toNewPane}>New Project</Button>
          </div>
        </header>
        <ProjectList />
        </Sider>
        { rightSide }
      </Layout>
      </div>
    );
  }
}

export default connect(({ layout }) => ({ layout }))(IndexPage);

// <Layout style={{ background: '#fff'}}>
          // </Layout>

// <ReactCSSTransitionGroup
//           component="div"
//           transitionName="example"
//           className="tra-container"
//           transitionAppear={true}
//           transitionAppearTimeout={500}
//           transitionEnterTimeout={500}
//           transitionLeaveTimeout={500}
//           >
//             {
//               // children
//               React.cloneElement(children, {
//                 key: history.pathname,
//               })
//             }
//           </ReactCSSTransitionGroup>
