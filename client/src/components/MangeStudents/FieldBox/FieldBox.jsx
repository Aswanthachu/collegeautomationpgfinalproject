import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

import AppBarComponent from './AppBar/AppBar';
import UserComponents from './UserComponents/UserComponents';

const FieldBox = ({ loginedUser}) => {
  const [actions,setActions]=useState({});

  const action = useSelector(state => state.user.actionType);

  useEffect(() => {
    setActions(action);
  }, [action]);

  return (
    <>
      <AppBarComponent loginedUser={loginedUser}/>
      <UserComponents loginedUser={loginedUser} actions={actions} />
    </>
  )
}

export default FieldBox;