import React from 'react'
import { Media, Button ,Modal}from 'react-bootstrap';

const Nominations = (props) => {

    const { nominations, removeHandler } = props
    const remainder = 5 - nominations.length
 
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Nominations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {remainder > 0 ?
                <h5 className='remainder'>You have {remainder} {remainder === 1 ? 'nomination' : 'nominations'} left</h5>
                :
                <h5 className='remainder'>Tada! You've finished voting!</h5>
                } 
         {nominations.length > 0 &&
                    nominations.map((nominee,i) => 
                        <div className='nominations' key={i}>
                        <Media>
                            <img
                                width={64}
                                className="mr-3"
                                src={nominee.Poster}
                                alt={nominee.Title}
                            />
                            <Media.Body className='nominee-text'>
                                <h5 className='nominee-header'>{nominee.Title}</h5>
                                <p>{nominee.Year}</p>
                            </Media.Body>
                            <Button variant="danger" onClick={() => removeHandler(nominee)}>Remove</Button>
                        
                        </Media>
                        </div>
                    )
                    }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      

    )
}

export default Nominations