import React from 'react';
import './Footer.scss'
import { Col, Row } from 'reactstrap';

function Footer(props) {
    return (
        <footer className="bg-dark container-fluid text-white-50">
            <div className="container">
                <Row className="py-2 py-sm-3 py-md-4" style={{fontSize: '1.6rem', fontFamily: 'fantasy'}}>
                    <Col>
                        <div>Designer by <span className="text-uppercase">kr. thuan</span></div>
                        <div>About: Frontend Dev Web</div>
                    </Col>
                    <Col>
                        <div>Contact me:</div>
                        <a href="https://www.facebook.com/nguyenminh.thuan.14224/" target="_blank" rel="noreferrer" className="social-1">
                            <span className="offscreen">facebook</span>
                        </a>
                        <a href="https://www.youtube.com/channel/UCyjvjvXfYoSm9D3oMpmTgAQ" target="_blank" rel="noreferrer" className="social-2">
                            <span className="offscreen">youtube</span>
                        </a>
                        <a href="https://github.com/minhthuan231000" target="_blank" rel="noreferrer" className="social-3">
                            <span className="offscreen">github</span>
                        </a>
                    </Col>
                    <Col>
                        <span>API by</span>
                        <a api='api' href="https://pokeapi.co/">
                        </a>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;