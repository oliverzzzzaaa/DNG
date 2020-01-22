import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className='home-main'>
                <div className='home-logo'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV3cdmfEDITM8oDEZpA4iBp3B8zr_XxVMGsv_Cds4o5UjdVc5ZvQ&s" />
                </div>
                <div className='carousels'> 
                    <Carousel>
                        <Carousel.Item>
                            <img src="https://image.tmdb.org/t/p/w1280/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"/>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img src="https://image.tmdb.org/t/p/w1280/bfHlGMDq2RqRT1xmjq9NJSzfhCv.jpg"/>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img src="https://image.tmdb.org/t/p/w1280/tgcrYiyG75iDcyk3en9NzZis0dh.jpg"/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="https://image.tmdb.org/t/p/w1280/UVDWwC7Mpbis9U9WPqbRHmxSG1.jpg"/>
                        </Carousel.Item>  
                    </Carousel>
                </div>
                <div className='home-button'>
                    <button className='home-login'>
                        Log In<Link to='/login' />
                    </button>
                    <button className='home-signup'>
                        Sign Up<Link to='/signup'/>
                    </button>
                </div>
            </div>
        )
    }
}

export default HomePage;