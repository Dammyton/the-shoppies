import React, { useState } from 'react'
import { Button, Modal }from 'react-bootstrap';

const CompletevoteModal = () => {

  const [ show, setShow ] = useState(true)

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Modal contentClassName='modal gif' centered='true' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title  text-center'>🎉Thanks for Voting!🎉 </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          You've reached the maximum no. of Voting.
          
        </Modal.Body>
        <Modal.Footer>
          <Button className='nominate' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }

export default CompletevoteModal