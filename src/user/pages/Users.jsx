import React from 'react'
import UsersList from '../components/UsersList'

function Users() {
    const USERS = [{id:'u1', name:'dagim demissew', image:'https://wallbuilder.files.wordpress.com/2011/02/achilles.jpg', places:3}];
  return (
    <UsersList items = {USERS} />
    )
};

export default Users;