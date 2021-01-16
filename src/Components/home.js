import React, { useState } from 'react'
import Movies from './movies'
import SearchNow from './searchNow'
import Nominations from './nominations'
import { Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import CompletevoteModal from './completevoteModal';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import PageLoader from './pageLoader'
const Home = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const [title, setTitle] = useState('')
    const [movies, setMovies] = useState([])
    const [nominations, setNominations] = useState([])
    const [pageloader, setPageLoader] = useState(false)

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (title.length === 0) {
            alert('Search Somthing!')
        }

        setPageLoader(true);

        fetch(`http://www.omdbapi.com/?apikey=9235bc72&s=${title}`)
            .then(res => res.json())
            .then(movies => {
                setPageLoader(false);
                if(movies){
                    setMovies(movies.Search)
                } else{
                   return  "hey"
                }

            })
            .catch(error => {
                if (error) {
                    setTitle(`No results found for ${title}`)
                    setMovies([])
                    // alert('An error occurred. Try Again Later!')
                }
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
            {pageloader &&<Container>
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
                        {movies.length > 0 && <div>
                            <h3 className='sub-header'>Movies</h3>
                            <h5 className='remainder'>Search Results for "{title}"</h5>
                        </div>}
                        <div >
                            {movies.length > 0 ? <Row className='movies'> {movies.map((movie, key) => <Col lg="3" md="4" sm="12" key={key} className="mb-3"><Movies id={key} movie={movie} nominateHandler={nominateHandler} nominations={nominations} title={title} /></Col>)}</Row> : <SearchNow />}
                        </div>
                    </Col>
                    
                    <Col> <Nominations nominations={nominations} removeHandler={removeHandler}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /></Col>
                </Row>
            </Container>
            }
        </div>

    )
}

export default Home