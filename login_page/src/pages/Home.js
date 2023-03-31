import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';


function Home() {
 const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to my website{user ? `, ${user.username}!` : '!'}</h1>
      <p>Here's some information about me:</p>
      <ul>
        <li>Name: John Smith</li>
        <li>Occupation: Web Developer</li>
        <li>Hobbies: Reading, Running, Traveling</li>
      </ul>
    </div>
  );
}

export default Home;
