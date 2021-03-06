import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { fetchAllApplications, fetchDeleteApplication, fetchEditApplication } from '../../store/applications';
import Footer from "../Footer";
import Header from "../Header";
import "./Applications.css"
import "../Listings/DeleteListingModal/DeleteModal.css"

const EditApplication = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector(state => state.session.user.id)
  const application = useSelector(state => state.applications[params.id])

  const [errors, setErrors] = useState([])
  const [name, setName] = useState(application.name)
  const [age, setAge] = useState(application.age)
  const [email, setEmail] = useState(application.email)
  const [cellphone, setCellphone] = useState(application.cellphone)
  const [address, setAddress] = useState(application.address)
  const [city, setCity] = useState(application.city)
  const [state, setState] = useState(application.state)
  const [zipcode, setZipcode] = useState(application.zipcode)
  const [homeType, setHomeType] = useState(application.home_type)
  const [pets, setPets] = useState(application.pets)
  const [household, setHousehold] = useState(application.household)
  const [vetName, setVetName] = useState(application.vet_name)
  const [vetCellphone, setVetCellphone] = useState(application.vet_cellphone)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  useEffect(() => (
    dispatch(fetchAllApplications())
  ), [dispatch])

  const deleteApplication = async (e) => {
    e.preventDefault();

    const data = dispatch(fetchDeleteApplication(application.id));
    if (data) {
      setErrors(data);
    }
    history.push(`/users/${userId}`)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(fetchEditApplication(
        application.id,
        name,
        age,
        email,
        cellphone,
        address,
        city,
        state,
        zipcode,
        homeType,
        pets,
        household,
        vetName,
        vetCellphone,
    ))
    if (data) {
      setErrors(data);
      alert("Please review your form again.")
    } else {
      history.push(`/users/${userId}`)
    }
  };


  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateAge = (e) => {
    setAge(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateCellphone = (e) => {
    setCellphone(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateZipcode = (e) => {
    setZipcode(e.target.value);
  };

  const updateHomeType = (e) => {
    setHomeType(e.target.value);
  };

  const updatePets = (e) => {
    setPets(e.target.value);
  };

  const updateHousehold = (e) => {
    setHousehold(e.target.value);
  };

  const updateVetName = (e) => {
    setVetName(e.target.value);
  };

  const updateVetCellphone = (e) => {
    setVetCellphone(e.target.value);
  };


  return (
    <>
    <Header />
      <div className='background-div'></div>
        <div className='form-container'>
          <form onSubmit={onSubmit}>
            <h1 className='form-header'>ADOPTION FORM</h1>
            <div className='form-name'>
              <label>NAME</label>
              <input
                type='text'
                name='name'
                onChange={updateName}
                value={name}
                required={true}
              ></input>
              {errors.name ? <h4>{errors.name}</h4> : null}
            </div>
            <div className='form-age'>
              <label>AGE</label>
              <input
                type='number'
                name='age'
                onChange={updateAge}
                value={age}
                required={true}
              ></input>
              {errors.age ? <h4>{errors.age}</h4> : null}
            </div>
            <div className='form-email'>
              <label>EMAIL</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>
              {errors.email ? <h4>{errors.email}</h4> : null}
            </div>
            <div className='form-cellphone'>
              <label>CELL PHONE</label>
              <input
                type='text'
                name='cellphone'
                onChange={updateCellphone}
                value={cellphone}
                required={true}
              ></input>
              {errors.cellphone ? <h4>{errors.cellphone}</h4> : null}
            </div>
            <div className='form-address'>
              <label>ADDRESS</label>
              <input
                type='text'
                name='address'
                onChange={updateAddress}
                value={address}
                required={true}
              ></input>
              {errors.address ? <h4>{errors.address}</h4> : null}
            </div>
            <div className='form-city'>
              <label>CITY</label>
              <input
                type='text'
                name='city'
                onChange={updateCity}
                value={city}
                required={true}
              ></input>
              {errors.city ? <h4>{errors.city}</h4> : null}
            </div>
            <div className='form-state'>
              <label>STATE</label>
              <select name='state' onChange={updateState} value={state} required={true}>
                <option value=""></option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            {errors.state ? <h4>{errors.state}</h4> : null}
            </div>
            <div className='form-zipcode'>
              <label>ZIPCODE</label>
              <input
                type='text'
                name='zipcode'
                onChange={updateZipcode}
                value={zipcode}
                required={true}
              ></input>
              {errors.zipcode ? <h4>{errors.zipcode}</h4> : null}
            </div>
            <div className='form-home-type'>
              <label>HOME TYPE</label>
              <select name="homeType" onChange={updateHomeType} value={homeType} required={true}>
                <option value=""></option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Trailer">Trailer</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className='form-pets'>
              <label>PETS</label>
              <p>Please tell use if you own any other pets or animals, and if so please specify
                the species and how many you own and their general temperment.</p>
              <textarea
                type='text'
                name='pets'
                onChange={updatePets}
                value={pets}
                required={true}
              ></textarea>
              {errors.pets ? <h4>{errors.pets}</h4> : null}
            </div>
            <div className='form-household'>
              <label>HOUSEHOLD</label>
              <p>Please tell use a bit about your household like the number of adults, teens,
                children, or seniors that live with you. As well as a quick description of
                the dynamic of your house (calm, busy, etc). Any other additional information
                you'd like for us to know can be shared here as well!</p>
              <textarea
                type='text'
                name='household'
                onChange={updateHousehold}
                value={household}
                required={true}
              ></textarea>
              {errors.household ? <h4>{errors.household}</h4> : null}
            </div>
            <div className='form-vet-name'>
              <label>VET'S NAME</label>
              <input
                type='text'
                name='vetName'
                onChange={updateVetName}
                value={vetName}
                required={true}
              ></input>
              {errors.vetName ? <h4>{errors.vetName}</h4> : null}
            </div>
            <div className='form-vet-cellphone'>
              <label>VET'S CELLPHONE</label>
              <input
                type='text'
                name='vetCellphone'
                onChange={updateVetCellphone}
                value={vetCellphone}
                required={true}
              ></input>
              {errors.vetCellphone ? <h4>{errors.vetCellphone}</h4> : null}
            </div>
            <div className='form-submit-btn delete-edit'>
              <button className='edit-btn' type='submit' >EDIT</button>
              <button className='delete-btn' type='button' onClick={() => setShowDeleteModal(true)}>DELETE</button>
            </div>
          </form>
        </div>
        <div className='filler'>
          <p></p>
        </div>
      <div className='footer'><Footer /></div>
      {showDeleteModal &&  (
        <Modal>
          <div className="delete-modal-confirmation">
            <h1 className="delete-modal-question">Are you sure you want to delete this application?</h1>
            <button className="delete-modal-yes" onClick={deleteApplication}>Yes</button>
            <button className="delete-modal-no" onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default EditApplication;
