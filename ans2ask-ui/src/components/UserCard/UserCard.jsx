import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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
import "./UserCard.css";

import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

export default function UserCard({ Username, Title, Email, About, Coins }) {
  const [username, setUsername] = useState(Username);
  const [title, setTitle] = useState(Title);
  const [about, setAbout] = useState(About);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
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
          <p className="mb-1">{Coins} coins</p>

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