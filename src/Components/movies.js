import React from 'react'
import { Button, Card }from 'react-bootstrap';

const Movies = (props) => {

    const { movie, nominateHandler, nominations } = props

    return(
        <div>
            {movie &&
            <Card bg='light' text='dark' className='text-center border-0 shadow'>
                <Card.Img
                    width={64}
                    height={200}
                    className="mr-3"
                    src={movie.Poster}
                    alt={movie.Title}
                />
                
                    <Card.Text>{movie.Title}-{movie.Year}</Card.Text>
              
                {nominations.includes(movie) || nominations.length === 5 ? <Button variant="secondary" disabled >Nominate</Button>: <Button className='btn-primary' onClick={() => nominateHandler(movie)}>Nominate</Button>}
                </Card>
            }
        </div>
    )
}

export default Movies