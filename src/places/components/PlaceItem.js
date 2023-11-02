import React, { useState, useContext } from 'react';

import Card from '../../shared/Components/UIElement/Card';
import Button from '../../shared/Components/FormElements/Button';
import Modal from '../../shared/Components/UIElement/Modal';
import Map from '../../shared/Components/UIElement/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/Hooks/http-hook.js';

import './PlaceItem.css';
import ErrorModal from '../../shared/Components/UIElement/ErrorModal';
import LoadingSpinner from '../../shared/Components/UIElement/LoadingSpinner';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false); //used for the Map
  const [showConfirmModal, setShowConfirmModal] = useState(false); //used for Delete place modal

  /* Map Open and Close Handler */
  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  /* Delete or cancel Place request modal handler */

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true); /* display the delete warning modal */
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(
      false
    ); /* on selecting cancel button will close the alert modal */
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {/* Modal for the display of the map */}
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className='map-container'>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      {/* Modal for deleting the place */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          /* Two jsx element in the same place is not possible, hence we do it by adding the react fragment */
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to delete the selected Place? Remember you can not undo
          once deleted!!
        </p>
      </Modal>
      <li className='place-list'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='place-item__image'>
            <img
              src={`http://localhost:5000/${props.imageUrl}`}
              alt={props.title}
            />
          </div>
          <div className='place-item__info'>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className='place-item__actions'>
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
