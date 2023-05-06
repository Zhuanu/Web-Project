import { useState, useContext } from "react";
import { UserContext } from "../AppContext";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { PencilSquare } from "react-bootstrap-icons";

const EditProfil = () => {
    const [show, setShow] = useState(false);
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState(false);

    const { setUser } = useContext(UserContext);

    const handleCheck = (e) => {
        e.preventDefault();
        setError(false);
        return (password === confirmPassword) ? handleSave() : setError(true);
    }

    const handleClose = () => {
        setShow(false);
        setBio('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(false);
    }
    const handleShow = () => setShow(true);

    const handleSave = () => {
        const data = {
            username: username,
            bio: bio,
            email: email,
            password: password
        };
      
        axios({
            method: 'POST',
            url: 'http://localhost:8000/api/user/editProfil',
            withCredentials: true,
            data: data
        })
        .then((res) => {
            console.log("data EditProfil", res.data);
            setUser(res.data.user)
            handleClose();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
    <>
        <Button variant="primary" 
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{ borderRadius: "10px", height: "40px", width: "120px", fontSize: "1.1rem" }} onClick={handleShow}
        >
            <PencilSquare size={22} style={{marginRight: "7px"}}/><span>Profil</span>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ width: '50%', margin: '0 auto' }}>Edit Profil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method="POST" action="">

                    <div className="form-group row">
                        <label htmlFor="Username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="Username" placeholder="Username" value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="Bio" className="col-sm-2 col-form-label">Bio</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="Bio" name="Bio" placeholder="Bio" rows="5" style={{resize: "none"}} value={bio}
                            onChange={(e) => {
                                setBio(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputConfirm" className="col-sm-2 col-form-label">Confirm password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputConfirm" placeholder="Confirm Password" value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}/>
                        </div>
                    </div>
                    {error && <p style={{color: 'red'}}>Passwords do not match</p>}

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCheck}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default EditProfil;