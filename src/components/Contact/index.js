import emailJs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const refForm = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailJs
      .sendForm(
        'service_q96pejm',
        'template_vm3cb5k',
        refForm.current,
        '6qyAEwWjWtSdzLFC_'
      )
      .then(
        (result) => {
          alert('Message successfully sent !');
          window.location.reload(false);
        },
        (error) => {
          alert('Failed to send the message, please try again.');
          console.log(error);
        }
      );
  };
  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
  }, []);
  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 't', '', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially ambitious or
            large projects. However, if you have other request or question,
            don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input type="text" name="subject" placeholder="Subject" />
                </li>
                <li>
                  <textarea placeholder="Message" name="message" required />
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="info-map">
          Salma Soussi,
          <br />
          Tunisia,
          <br />
          home house 19, 4011 <br />
          Hammma Sousse <br />
          <br />
          <span>soussiselma@hotmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer
            center={[35.85349522826802, 10.59677567842646]}
            zoom={14}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[35.85349522826802, 10.59677567842646]}>
              <Popup>Salma lives here, come over for a cup of tea :).</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="cube-transition" />
    </>
  );
};

export default Contact;
