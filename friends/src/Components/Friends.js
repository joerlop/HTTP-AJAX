import React from 'react';
import './Friends.scss';

import Friend from "./Friend"

function Friends(props) {
  return (
    <div className="Friends">
        {props.friendsList.map(friend => 
            <Friend friend={friend} delete={props.delete} />    
        )}
    </div>
  );
}

export default Friends;