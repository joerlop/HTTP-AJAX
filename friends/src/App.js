import React from 'react';
import './App.scss';
import axios from "axios";

import Friends from "./Components/Friends"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      friend: {
        name: "",
        age: "",
        email: ""
      },
      id: ""
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        console.log(res);
        this.setState({
          friends: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChanges = (event) => {
    event.preventDefault();

    if (event.target.placeholder == "Name") {
      this.setState({
        ...this.state,
        friend: {
          ...this.state.friend,
          name: event.target.value
        }
      })
    } else if (event.target.placeholder == "Age") {
      this.setState({
        ...this.state,
        friend: {
          ...this.state.friend,
          age: event.target.value
        }
      })
    } else {
      this.setState({
        ...this.state,
        friend: {
          ...this.state.friend,
          email: event.target.value
        }
      })
    }
  }

  addFriend = event => {
    event.preventDefault(); 
    axios.post("http://localhost:5000/friends", {
      name: this.state.friend.name,
      age: this.state.friend.age,
      email: this.state.friend.email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    const newFriends = this.state.friends;
    newFriends.push(this.state.friend);
    this.setState({
      friends: newFriends,
      friend: {
        name: "",
        age: "",
        email: ""
      },
      id: ""
    })
  }

  handleId = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      id: event.target.value
    })
  }

  updateFriend = event => {
    event.preventDefault();
    const friendsList = this.state.friends;
    const friendToUpdate = friendsList.find(friend => `${friend.id}` === this.state.id);
    console.log(friendToUpdate);
    const updatedName = this.state.friend.name == "" ? friendToUpdate.name : this.state.friend.name;
    const updatedAge = this.state.friend.age == "" ? friendToUpdate.age : this.state.friend.age;
    const updatedEmail = this.state.friend.email == "" ? friendToUpdate.email : this.state.friend.email;
    console.log(updatedAge);
    axios.put(`http://localhost:5000/friends/${this.state.id}`, {
      name: updatedName,
      age: updatedAge,
      email: updatedEmail
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    const oldFriends = [...this.state.friends];
    oldFriends[this.state.id - 1] = {
      name: updatedName,
      age: updatedAge,
      email: updatedEmail
    }
    this.setState({
      friends: oldFriends,
      friend: {
        name: "",
        age: "",
        email: ""
      },
      id: ""
    })
  }

  deleteFriend = (event, id) => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/friends/${id}`);
    console.log(event);
    const friends = this.state.friends.filter(friend => friend.id !== id);
    this.setState({
      ...this.state,
      friends: friends
    })
  }

  render() {
    return (
      <div className="App">
        <Friends friendsList={this.state.friends} delete={this.deleteFriend} />
        <form onSubmit={(e) => this.addFriend(e)}>
            <input placeholder="Name" onChange={(event) => this.handleChanges(event)} value={this.state.friend.name}></input>
            <input placeholder="Age" onChange={(event) => this.handleChanges(event)} value={this.state.friend.age}></input>
            <input placeholder="Email" onChange={(event) => this.handleChanges(event)} value={this.state.friend.email}></input>
            <input placeholder="Id" onChange={(event) => this.handleId(event)} value={this.state.id}></input>
            <button onClick={(e) => this.addFriend(e)}>Save</button>
            <button onClick={(e) => this.updateFriend(e)}>Update</button>
        </form>
      </div>
    );
  }
}

export default App;
