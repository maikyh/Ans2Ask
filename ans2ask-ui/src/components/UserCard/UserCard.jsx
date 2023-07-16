import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from '../../UserContext.js';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  IconButton,
  ButtonGroup,
  Input,
  Flex,
  useEditableControls
} from '@chakra-ui/react' 
import Swal from 'sweetalert2';
import "./UserCard.css";

import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function UserCard({ Id, Username, Title, Email, About, Coins }) {
  const [username, setUsername] = useState(Username);
  const [title, setTitle] = useState(Title);
  const [about, setAbout] = useState(About);
  const [coins, setCoins] = useState(Coins);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleUpdateUsername = async (e) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, title, about, coins }),
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        const UpdatedUser = data.user;

        updateUser(UpdatedUser);

        window.location.reload();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password. Please try again.',
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed: ' + error,
        text: 'An error occurred while processing your registration. Please try again later.',
      });
    }
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <div onClick={handleUpdateUsername}>
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        </div>
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <div className="UserCard card">
      <div className="card-body d-flex align-items-center">
        <FontAwesomeIcon className="fa-10x user-icon m-5" icon={faUser} />
        <div>
          
        <div className="row">
          <div className="col d-flex align-items-center">
          <Editable
            textAlign='center'
            defaultValue={username}
            fontSize='calc(1.325rem + .9vw)'
            isPreviewFocusable={false}
          >
            <div className="row">
              <div className="col d-flex align-items-center">
                <EditablePreview />
                <Input onChange={(e) => setUsername(e.target.value)} style={{fontSize: 'calc(1.325rem + .9vw)'}} as={EditableInput} />  
              </div>
              <div className="col-auto d-flex align-items-center">
                <EditableControls />
              </div>
            </div>
          </Editable>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex align-items-center">
          <Editable
            textAlign='center'
            defaultValue={title}
            fontSize='1.25rem'
            className='fw-bold'
            isPreviewFocusable={false}
          >
            <div className="row">
              <div className="col d-flex align-items-center">
                <EditablePreview />
                <Input className='fw-bold' onChange={(e) => setTitle(e.target.value)} style={{fontSize: '1.25rem'}} as={EditableInput} />  
              </div>
              <div className="col-auto d-flex align-items-center">
                <EditableControls />
              </div>
            </div>
          </Editable>
          </div>
        </div>

          <p className="mb-0">{Email}</p>
          <p className="mb-1">{coins} coins</p>

          <div className="row">
            <div className="col d-flex align-items-center">
            <Editable
              textAlign='center'
              defaultValue={about}
              isPreviewFocusable={false}
            >
              <div className="row">
                <div className="col d-flex align-items-center">
                  <EditablePreview />
                  <Input onChange={(e) => setAbout(e.target.value)} as={EditableTextarea} />  
                </div>
                <div className="col-auto d-flex align-items-center">
                  <EditableControls />
                </div>
              </div>
            </Editable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}