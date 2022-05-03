import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img_logo from './images/react-logo.png'
import {Button, Navbar, Nav, Container, Row} from "react-bootstrap";
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import NFTList from "./components/NftList";
import {ConnectWallet} from "./components/ConnectWallet";
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import MintNft from "./components/MintNft";

function App() {
    window.Buffer = window.Buffer || require("buffer").Buffer
    return (
        <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
            <Router>
            <div className="App">
                <header>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={img_logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                NFT app
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">NFT List</Nav.Link>
                                    <Nav.Link href="/mint">Mint</Nav.Link>
                                </Nav>
                                <ConnectWallet/>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container>
                        <Routes>
                            <Route exact path='/' element={<NFTList/>} />
                            <Route exact path='/mint' element={<MintNft/>} />
                        </Routes>
                    </Container>
                </main>
            </div>
            </Router>
        </ThirdwebProvider>
    );
}

export default App;
