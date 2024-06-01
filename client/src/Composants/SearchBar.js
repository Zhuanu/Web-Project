import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from './AppContext';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';


const ProfilPicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
`;

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setProfil, setFriend } = useContext(UserContext);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        axios({
            method: "GET",
            url: `http://localhost:8000/api/user/search?pseudo=${value}`,
            withCredentials: true,
        })
        .then((res) => {
            setSearchResults(res.data.users);
        })
        .catch(err => {
            console.log(err)
        });
    };

    const handleClick = (user) => {
        setFriend(user);
        setProfil(user._id);
        setSearchTerm('');
        setSearchResults([]);
    };

    return (

    <div className="dropdown position-relative col-4">
        <div className='d-flex rounded-pill border'>
            <input
                className="form-control mr-sm-2 rounded-pill"
                type="text"
                style={{color: "black", border: "none", outline: "none", backgroundColor: 'transparent'}}
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
            <Search className="text-primary" size={20} style={{position: "absolute", top: "10px", right: "10px"}}/>
        </div>
        {searchResults.length > 0 && (
            <div className="position-absolute text-primary border p-3 fenetre" style={{
                zIndex: 9999, 
                opacity: "0.9", 
                marginTop: "12px", 
                width: "100%", 
                borderRadius: "10px", 
                maxHeight: "50vh", 
                overflow: "auto"}}
            >
            {searchResults.map((user) => (
                <Link key={user._id} to={`/profil/${user._id}`} style={{textDecoration: "none"}} className="d-flex dropdown-item m-2 text-info" onClick={() => { handleClick(user) }}>
                    {user.profil.picture ? (<ProfilPicture src={`/uploads/${user._id}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                    <div className='' style={{ marginLeft: "15px" }}>
                        <p style={{marginBottom: 0}}>@{user.profil.pseudo}</p>
                        <p>{user.profil.followers.length + " followers - " + user.profil.following.length + " following"}</p>
                    </div>
                </Link>
            ))}
            </div>
        )}
    </div>

    );

    // return (
    //     <Dropdown className='d-inline-block'>
    //         <form className="form-inline my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                // <input
                //     className="form-control mr-sm-2"
                //     type="search"
                //     placeholder="Search"
                //     aria-label="Search"
                //     value={searchTerm}
                //     onChange={handleSearch}
                // />
    //             <button className="btn btn-outline-success dropdown-toggle my-2 my-sm-0" type="submit" data-bs-toggle="dropdown" aria-expanded="false">Search</button>
    //         </form>

    //     <p className=''>{searchResults.length + ""}</p>
        // {searchResults.length > 0 && (
    //         <Dropdown.Menu className='dropdown-toggle'>
    //             {searchResults.map((result) => (
    //                 <Dropdown.Item key={result._id}>
                        // <div className='d-flex'>
                        //     {result.picture ? (<ProfilPicture src={`/uploads/${result._id}.jpg`} alt='pp'/>) : (<ProfilPicture src="/uploads/default.jpg" alt='pp'/>)}
                        //     <span className="text-warning" style={{ marginLeft: "15px" }}>@{result.pseudo}</span>
                        // </div>
    //                 </Dropdown.Item>
    //             ))}
    //         </Dropdown.Menu>
    //     )}
    //     </Dropdown>
    // );
}

export default SearchBar;
