import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Progress, Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ResultList from './components/Result/ResultList';

const ButtonGroup = Button.Group;

class App extends Component {

  state = {progress: 0};

	handleProgress = (progress) =>{
    this.setState({progress})
  };

  render() {

		const { t, i18n } = this.props;

    return (
      <div className="App">
				<Progress percent={this.state.progress} status={this.state.progress === 100 ? 'success' : 'active' } showInfo={false} className="progress--topBar" />
        <div className="container-fluid">
					<div className="row">
						<div className="col-12 d-flex justify-content-end mt-3">
							<ButtonGroup>
								<Button type={i18n.languages[0].substring(0,2) === 'fr' ? 'primary' : ''}
												onClick={() => i18n.changeLanguage('fr')}>FR</Button>
								<Button type={i18n.languages[0].substring(0,2) === 'en' ? 'primary' : ''}
												onClick={() => i18n.changeLanguage('en')}>EN</Button>
							</ButtonGroup>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1 className="my-4 text-center">
								{t('mainTitle')}
							</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<ResultList onProgressChange={this.handleProgress}/>
						</div>
					</div>
				</div>
      </div>
    );
  }
}

export default translate('common')(App);
