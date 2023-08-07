import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext.js';
import { url, MAX_TIME, nothingInLocalStorage } from "../../utils/Constants.jsx";
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
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import Uploadimage from '../UploadImage/UploadImage.jsx';
import Text from '../../utils/Text.jsx';
import { useParams } from 'react-router-dom';
import "./UserCard.css";

const UserCard = ({ user, images }) => {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [coins, setCoins] = useState("");
    const [image, setImage] = useState("");
    const [meta, setMeta] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const { updateUser, darkMode } = useContext(UserContext);
    const { id } = useParams();

    const handleSetIsUpdating = () => {
        setIsUpdating(!isUpdating);
    }

    const removeImageQueryFromLocalStorage = (query) => {
        localStorage.removeItem('images' + '/' + query);
    };

    const UpdateUsernameHelper = (e) => {
        setUsername(e.target.value);
        handleUpdateUsername();
    };

    const UpdateTitleHelper = (e) => {
        setTitle(e.target.value);
        handleUpdateTitle();
    };

    const UpdateAboutHelper = (e) => {
        setAbout(e.target.value);
        handleUpdateAbout();
    };

    const handleUpdateUsername = async () => {
        try {
            const response = await fetch(url + `/users` + `/${user.id}`, {
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

                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update of Username Failed',
                    text: 'Invalid username. Please try again.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update of Username Failed: ' + error,
                text: 'Invalid username. Please try again.',
            });
        }
    };

    const handleUpdateTitle = async () => {
        try {
            const response = await fetch(url + `/users` + `/${user.id}`, {
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

                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update of Title Failed',
                    text: 'Invalid title. Please try again.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update of Title Failed: ' + error,
                text: 'Invalid title. Please try again.',
            });
        }
    };

    const handleUpdateAbout = async () => {
        try {
            const response = await fetch(url + `/users` + `/${user.id}`, {
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

                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Update of About Failed',
                    text: 'Invalid about. Please try again.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update of About Failed: ' + error,
                text: 'Invalid about. Please try again.',
            });
        }
    };

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getEditButtonProps,
        } = useEditableControls();

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
        );
    }

    //User
    useEffect(() => {
        const cachedUser = localStorage.getItem('/users' + '/' + id);
        if (cachedUser && cachedUser.length > nothingInLocalStorage) {
            setCurrentUser(JSON.parse(cachedUser));
            setUsername(cachedUser.username);
            setTitle(cachedUser.title);
            setAbout(cachedUser.about);
        }
        else {
            const fetchUser = async () => {
                const response = await fetch(url + '/users' + '/' + id);
                const data = await response.json();
                setCurrentUser(data);
                setUsername(data.username);
                setTitle(data.title);
                setAbout(data.about);
            };

            fetchUser();
        }
    }, [id]);

    //Images/user
    //The Cloudinary API is limited to fetching 10 images per request. That's why I needed to individually recall images if the user's picture didn't appear in the initial fetch in app.jsx.
    useEffect(() => {
        const currImage = images?.filter(image => image.public_id === currentUser.email);
        if (currImage && currImage[0]) {
            setImage(currImage[0])
            return;
        }

        if (currentUser) {
            const cachedImage = localStorage.getItem('images' + '/' + currentUser.email);
            if (cachedImage && cachedImage.length > nothingInLocalStorage) {
                setImage(JSON.parse(cachedImage));
            }
            else {
                const fetchImage = async () => {
                    const response = await fetch(url + '/images' + '/' + currentUser.email);
                    const data = await response.json();
                    setImage(data);
                };

                fetchImage();
            }
        }
    }, [currentUser, id]);

    useEffect(() => {
        localStorage.removeItem('images' + '/' + currentUser.email);
        localStorage.setItem('images' + '/' + currentUser.email, JSON.stringify(image));
        const timer = setTimeout(() => removeImageQueryFromLocalStorage(currentUser.email), MAX_TIME);
        return () => clearTimeout(timer);
    }, [image])

    //Meta image
    useEffect(() => {
        const cachedMeta = localStorage.getItem('/images' + '/' + "metaa_ez3xnh");
        if (cachedMeta && cachedMeta.length > nothingInLocalStorage) {
            setMeta(JSON.parse(cachedMeta));
        }
        else {
            const fetchMeta = async () => {
                const response = await fetch(url + '/images' + '/' + "metaa_ez3xnh");
                const data = await response.json();
                setMeta(data);
            };

            fetchMeta();
        }
    }, []);

    return (
        <div className="UserCard justify-content-center align-items-center" style={{ padding: "10px", marginLeft: "95px" }}>
            {
                !isUpdating &&
                <div className="card-body d-flex align-items-center">
                    <div className='preview-container' style={{ margin: "10px", marginRight: "30px", width: "200px", height: "200px" }}>
                        {image && image.url &&
                            <img className='preview-image' src={image.url} alt="lol" />
                        }
                    </div>
                    <div className='mx-2' style={{ marginRight: "100px" }}>
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <Editable
                                    style={{ color: darkMode ? Text.darkMode : Text.lightMode }}
                                    textAlign='center'
                                    value={username}
                                    fontSize='calc(1.325rem + .9vw)'
                                    isPreviewFocusable={false}
                                >
                                    <div className="row">
                                        <div className="col d-flex align-items-center">
                                            <EditablePreview />
                                            <Input
                                                onKeyDown={(event) => event.key === 'Enter' && UpdateUsernameHelper(event)}
                                                onChange={(e) => setUsername(e.target.value)}
                                                style={{ fontSize: 'calc(1.325rem + .9vw)' }}
                                                as={EditableInput}
                                            />
                                        </div>
                                        {
                                            parseInt(id) === user.id &&
                                            <div className="col-auto d-flex align-items-center">
                                                <EditableControls />
                                            </div>
                                        }
                                    </div>
                                </Editable>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <Editable
                                    style={{ color: darkMode ? Text.darkMode : Text.lightMode }}
                                    textAlign='center'
                                    fontSize='1.25rem'
                                    className='fw-bold'
                                    isPreviewFocusable={false}
                                    value={title}
                                >
                                    <div className="row">
                                        <div className="col d-flex align-items-center">
                                            <EditablePreview />
                                            <Input
                                                className='fw-bold'
                                                onKeyDown={(event) => event.key === 'Enter' && UpdateTitleHelper(event)}
                                                onChange={(e) => setTitle(e.target.value)}
                                                style={{ fontSize: '1.25rem' }}
                                                as={EditableInput}
                                            />
                                        </div>
                                        {
                                            parseInt(id) === user.id &&
                                            <div className="col-auto d-flex align-items-center">
                                                <EditableControls />
                                            </div>
                                        }
                                    </div>
                                </Editable>
                            </div>
                        </div>

                        <p style={{ color: darkMode ? Text.darkMode : Text.lightMode }} className="mb-0">{currentUser ? currentUser.email : ""}</p>
                        <p style={{ color: darkMode ? Text.darkMode : Text.lightMode }} className="mb-1">{currentUser ? currentUser.coins : ""} coins</p>

                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <Editable
                                    style={{ color: darkMode ? Text.darkMode : Text.lightMode }}
                                    value={about}
                                    isPreviewFocusable={false}
                                >
                                    <div className="row">
                                        <div className="col d-flex align-items-center">
                                            <EditablePreview />
                                            <Input
                                                onKeyDown={(event) => event.key === 'Enter' && UpdateAboutHelper(event)}
                                                onChange={(e) => setAbout(e.target.value)}
                                                as={EditableTextarea}
                                            />
                                        </div>
                                        {
                                            parseInt(id) === user.id &&
                                            <div className="col-auto d-flex align-items-center">
                                                <EditableControls />
                                            </div>
                                        }
                                    </div>
                                </Editable>
                            </div>
                        </div>

                        {
                            parseInt(id) === user.id &&
                            <div className='row'>
                                <div className="mt-3">
                                    <button onClick={() => { handleSetIsUpdating() }} className='btn btn-primary p-1 px-2'> Update Photo </button>
                                </div>
                            </div>
                        }

                    </div>
                    <div style={{ position: "absolute", right: "862px", borderLeft: '2px solid grey', height: '270px', marginLeft: "98px" }}></div>
                    <div className='row justify-content-center align-items-center' style={{ position: "absolute", right: "350px", margin: "10px", marginLeft: "196px", marginRight: "10px", width: "400px", height: "250px" }}>
                        {meta && meta.url &&
                            <img className='' src={meta.url} alt="lol" />
                        }
                    </div>
                </div>
            }
            {
                isUpdating &&
                <div>
                    <Uploadimage handleSetIsUpdating={handleSetIsUpdating} />
                </div>
            }
        </div>
    );
}

export default UserCard;