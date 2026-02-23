import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactPage.css';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
    return (
        <div className="contact-page">
            <Header />

            <main className="contact-main">
                <div className="container contact-container">
                    {/* Contact Info Side */}
                    <div className="contact-info">
                        <div className="info-item">
                            <div className="icon-circle">
                                <Mail size={20} />
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>itsupport@jaxergroup.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-circle">
                                <Phone size={20} />
                            </div>
                            <div className="info-text">
                                <h3>Telepon</h3>
                                <p>+62 812 3456 7890</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="icon-circle">
                                <MapPin size={20} />
                            </div>
                            <div className="info-text">
                                <h3>JaxerLab Headquarter</h3>
                                <p>
                                    Jl. Cempaka Putih Tengah XVII No.F33,<br />
                                    Cemp. Putih, Kec. Cemp. Putih,<br />
                                    Central Jakarta, DKI Jakarta 10510
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="contact-map">
                        <div className="map-frame">
                            {/* Embed Google Maps for Cempaka Putih Tengah XVII No.F33 */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521873330663!2d106.8687396!3d-6.1770258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f506e761619b%3A0x6c6c49666683832c!2sJl.%20Cempaka%20Putih%20Tengah%20XVII%20No.33%2C%20RT.4%2FRW.8%2C%20Cemp.%20Putih%20Tim.%2C%20Kec.%20Cemp.%20Putih%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010510!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="JaxLab Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
