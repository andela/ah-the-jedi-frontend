import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { OptInOutAction, NotifyStatusAction } from '../redux/actions/NotificationsOptinAction';

class OptInOutView extends Component {

  componentDidMount(){
    const { NotifyStatusAction } = this.props;
    NotifyStatusAction();
  }

  onClick = (e, isSubscribed) => {
    const { OptInOutAction } = this.props;
    const data = {
      [e.target.name]: isSubscribed,
    }
    OptInOutAction(data)
  };

  render() {
    const { data, status } = this.props;
    const { isLoading } = status

    return (
      <>
      <div className="opt-choice">
         <p>Email</p>
         {data.data.subscriptions && data.data.subscriptions.email === true ? (
           <label className="switch">
             <input type="checkbox" name="email" checked onClick={() => this.onClick(event, false)} />
             <span className="slider round" />
           </label>
         ):(
           <label className="switch">
             <input type="checkbox" id="email" name="email" onClick={() => this.onClick(event, true)} />
             <span className="slider round" />
           </label>
         )}

       </div>
       <div className="opt-choice">
         <p>In App</p>
           {data.data.subscriptions && data.data.subscriptions.app === true ? (
             <label className="switch">
               <input type="checkbox" name="app" checked onClick={() => this.onClick(event, false)} />
               <span className="slider round" />
             </label>
           ):(
             <label className="switch">
               <input type="checkbox" name="app" onClick={() => this.onClick(event, true)} />
               <span className="slider round" />
             </label>
           )}

       </div>
       </>
    );
  }
}

export const mapStateToProps = state => ({
  data: state.OptInOutReducer,
  status: state.NotifyStatusReducer,
});

export const mapDispatchToProps = () => ({
  OptInOutAction,
  NotifyStatusAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(OptInOutView);
