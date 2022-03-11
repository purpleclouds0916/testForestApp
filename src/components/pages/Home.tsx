/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { Link } from 'react-router-dom';
import Card from '../organisms/Card';
import img from '../../img/hdr_univ-logo.png';
import homeImage from '../../img/home.jpg';
import './Home.css';

interface Props {
  title: string;
  description: string;
  isImg?: boolean;
  buttonText?: string;
}

const Home: VFC<Props> = (props) => {
  const { title, description, isImg = true, buttonText = '試してみる' } = props;

  return (
    <div className="home-body">
      <div className="home-background-image">
        <img src={homeImage} alt="" />
      </div>
      <div className="home-wrapper">
        <Card>
          <>
            {isImg && <img src={img} alt="" />}
            <div className="home-title">{title}</div>
            <div className="home-description">{description}</div>
            <div className="home-buttons">
              <Link to="/form">
                <div className="link-button">{buttonText}</div>
              </Link>
            </div>
          </>
        </Card>
      </div>
    </div>
  );
};

export default Home;
