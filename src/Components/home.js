import React, { useState } from 'react'
import Movies from './movies'
import SearchNow from './searchNow'
import Nominations from './nominations'
import { Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import CompletevoteModal from './completevoteModal';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import PageLoader from './pageLoader'


const API_KEY = '9235bc72';

const Home = () => {
    const [modalShow, setModalShow] = useState(false);

    const [title, setTitle] = useState('')
    const [heading, setHeading] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [onload, setOnLoad] = useState(true)
    const [nominations, setNominations] = useState([])
    const [pageloader, setPageLoader] = useState(false)

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        setHeading(title);

        if (title.length === 0) {
            alert('Search Somthing!')
        }

        setPageLoader(true);

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`)
            .then(res => res.json())
            .then(response => {
                setPageLoader(false);

                if (response.Response === 'False') {
                    setError(response.Error);
                    setOnLoad(true);
                }
                else {
                    setError(null);
                    setOnLoad(false);
                    setMovies(response.Search);
                }

            })
            .catch(({ message }) => {
                setError(message);
                setOnLoad(true);
                setPageLoader(false);
            })
}

const nominateHandler = (movie) => {
    setNominations([...nominations, movie])
}

const removeHandler = (movie) => {
    let spreadNominations = [...nominations]
    let newNominations = spreadNominations.filter(nominee => nominee.Title !== movie.Title)
    setNominations(newNominations)
}

return (
    <div >
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">The Shoppies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => setModalShow(true)}> <i className="fa fa-certificate" aria-hidden="true"></i> Nominations</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {nominations.length === 5 ? <CompletevoteModal /> : ''}

        <Container className="mt-5 pt-5">
            <Form className='input' onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail" as={Col}>
                    <InputGroup>

                        <Form.Control onChange={titleHandler} value={title} type="text" placeholder="Enter Movie Title ..." />

                        <InputGroup.Append>
                            <InputGroup.Text>
                                <i className="fa fa-search" style={{ cursor: 'pointer' }} onClick={submitHandler} aria-hidden="true"></i>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Container>


        {pageloader && <Container>
            <Row>
                <Col md='12' className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                    <PageLoader />
                </Col>
            </Row>
        </Container>
        }


        {!pageloader &&
            <Container className='movie-noms'>
                <Row>
                    <Col md='12'>

                        {onload && !error && <SearchNow/>}
                        

                        {!onload && !error && movies.length > 0 &&
                         <div>
                            <h3 className='sub-header'>Movies</h3>
                            <h5 className='remainder'>Search Results for "{heading}"</h5>

                            <Row className='movies'> {movies.map((movie, key) => 
                                <Col lg="3" md="4" sm="12" key={key} className="mb-3">
                                    <Movies id={key} movie={movie} nominateHandler={nominateHandler} nominations={nominations} title={title} />
                                </Col>)}
                            </Row>
                        </div>
                        }


                        {onload && error &&
                            <>
                                <h5 className='remainder'>{error}</h5>
                                <SearchNow/>
                            </>
                        }

                    </Col>

                    <Col> 
                        <Nominations nominations={nominations} removeHandler={removeHandler}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />
                    </Col>


                </Row>
            </Container>
        }
    </div>

)
}

export default Home