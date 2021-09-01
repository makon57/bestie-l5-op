import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { fetchDeleteApplication } from "../../store/applications";
import "../Listings/DeleteListingModal/DeleteModal.css"


const ApplicationDetails = ({ application, showApplicationModal, setShowApplicationModal }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const [modalData, setModalData] = useState(null)
  const userId = useSelector(state => state.session.user?.id)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showApplicationDelete, setShowApplicationDelete] = useState(false)
  const listings = Object.values(useSelector(state => state.listings))


  const editApplication = (applicationId) => {
    history.push(`/applications/${applicationId}/edit`)
  }

  const deleteApplication = (applictionId) => {
    dispatch(fetchDeleteApplication(applictionId));
    setShowApplicationDelete(false)
    setShowDeleteModal(false)
    setShowApplicationModal(false)
  }


  return (
    <>
      <li key={application.id}>
        <div>
          <div className="application-info-container" onClick={() => {setShowApplicationModal(true); setModalData(application)}}>
            <div className='applicationInfo'>
              <p>NAME: {application.name}</p>
              <p>AGE: {application.age}</p>
              <p>BESTIE ID: {application.listing_id}</p>
              <p>BESTIE NAME: {listings[application.listing_id - 1].name}</p>
            </div>
            {application.user_id === userId ?
              <>
                <button className='edit-btns' onClick={() => editApplication(application.id)}><img src='https://i.imgur.com/6kTrPDn.png' alt='trash'></img></button>
                <button className='delete-btns' onClick={() => setShowApplicationDelete(true)}><img src='https://i.imgur.com/XEqfNqp.png' alt='trash'></img></button>
              </>
            : null }
           </div>
          {showApplicationDelete &&  (
            <Modal>
              <div className="delete-modal-confirmation">
                <h1 className="delete-modal-question">Are you sure you want to delete this application?</h1>
                <button className="delete-modal-yes" onClick={() => deleteApplication(application.id)}>Yes</button>
                <button className="delete-modal-no" onClick={() => setShowApplicationDelete(false)}>No</button>
              </div>
            </Modal>
          )}
        </div>
      </li>
      {showApplicationModal && modalData && (
        <Modal onClose={() => {setShowApplicationModal(false); setModalData(null)}}>
          <div className='petInfo'>
            <h1>{application.name}</h1>
            <p>BESTIE ID: {application.listing_id}</p>
            <p>BESTIE NAME: {listings[application.listing_id - 1].name}</p>
            <p>AGE: {application.age}</p>
            <p>ADDRESS: {application.address}</p>
            <p>HOME TYPE: {application.home_type}</p>
            <br></br>
            <p>HOUSEHOLD</p>
            <p>{application.household}</p>
            <br></br>
            <p>PETS</p>
            <p>{application.pets}</p>
            <p>VET NAME: {application.vet_name}</p>
            <p>VET CELLPHONE: {application.vet_cellphone}</p>
            { modalData.user_id === userId ?
            <div className='edit-delete-btns' >
              <button className='delete-btns' onClick={() => setShowDeleteModal(true)}><img src='https://i.imgur.com/XEqfNqp.png' alt='trash'></img></button>
              <button className='edit-btns' onClick={() => editApplication(application.id)}><img src='https://i.imgur.com/6kTrPDn.png' alt='trash'></img></button>
            </div>
            : null }
          </div>
          {showDeleteModal &&  (
            <Modal>
              <div className="delete-modal-confirmation">
                <h1 className="delete-modal-question">Are you sure you want to delete this application?</h1>
                <button className="delete-modal-yes" onClick={() => deleteApplication(application.id)}>Yes</button>
                <button className="delete-modal-no" onClick={() => setShowDeleteModal(false)}>No</button>
              </div>
            </Modal>
          )}
        </Modal>
      )}
    </>
  )
}

export default ApplicationDetails
