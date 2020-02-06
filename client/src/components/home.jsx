import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

class HomePage extends React.Component {
    render() {
        return (
          <div className="home-main">
            <div className="home-logo">
              <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
            </div>
            <div className="carousels">
              <Carousel>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c1.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c2.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c3.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c4.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c5.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c6.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c7.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c8.png" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c9.png" />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="home-button">
              <Link to="/login"><button className="home-login">Log In</button></Link>
              <Link to="/signup"><button className="home-signup">Sign Up</button></Link>
            </div>
          </div>
        );
    }
}

export default HomePage;