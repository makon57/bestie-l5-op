import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../components/Listings/Listing.css'
import '../components/Header/Header.css'
import ListingModal from './Listings/ListingModal';
import { fetchAllListings } from '../store/listings';

function User() {

  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const userId = useSelector(state => state.session.user.id)
  const things = Object.values(useSelector(state => state.listings))
  const listings = things.filter(things => things.user_id === userId)
  const [showListModal, setShowListModal] = useState(false)


  useEffect(() => {
    dispatch(fetchAllListings());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className='user-header-container'>
        <span className='user-header-name'>
          <p>Hi {user.name ? user.name.split(' ')[0] : 'Bestie'}!</p>
          <div className='user-information'>
            <ul>
              <li className='user-name'>
                <strong>{user.name}</strong>
              </li>
              <li className='user-email'>
                <strong>Email:</strong> {user.email}
              </li>
              <li className='user-foster'>
                <strong>Foster?</strong> {user.foster === true ? 'YES' : 'NO'}
              </li >
              {user.foster === true ?
                <li className='user-create'>
                  <button><Link to='/create-listing' >Create A Listing</Link></button>
                </li>
              : null }
            </ul>
          </div>
        </span>
      </div>

      <div className='list-container'>
        <ul className="listing-list">
          {listings?.map((listing)=> (
            <div key={listing.id} className="container">
              <ListingModal listing={listing} showListModal={showListModal} setShowListModal={setShowListModal} />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
export default User;
