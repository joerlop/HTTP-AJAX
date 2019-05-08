import React from 'react';
import './Friends.scss';

function Friend(props) {
  return (
    <div className="Friend">
        <h2>{props.friend.name}</h2>
        <p>{`Age: ${props.friend.age}`}</p>
        <p>{`Email: ${props.friend.email}`}</p>
    </div>
  );
}

export default Friend;