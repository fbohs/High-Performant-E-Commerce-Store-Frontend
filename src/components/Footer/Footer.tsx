import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <button className="back-to-top" onClick={scrollToTop}>
                Back to top
            </button>

            <div className="footer-links-container">
                <div className="footer-links-wrapper">
                    <div className="footer-column">
                        <h3>Get to Know Us</h3>
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press Releases</a></li>
                            <li><a href="#">ShopHub Science</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Connect with Us</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Make Money with Us</h3>
                        <ul>
                            <li><a href="#">Sell on ShopHub</a></li>
                            <li><a href="#">Sell under ShopHub Accelerator</a></li>
                            <li><a href="#">Protect and Build Your Brand</a></li>
                            <li><a href="#">ShopHub Global Selling</a></li>
                            <li><a href="#">Become an Affiliate</a></li>
                            <li><a href="#">Fulfilment by ShopHub</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Let Us Help You</h3>
                        <ul>
                            <li><a href="#">COVID-19 and ShopHub</a></li>
                            <li><a href="#">Your Account</a></li>
                            <li><a href="#">Returns Centre</a></li>
                            <li><a href="#">100% Purchase Protection</a></li>
                            <li><a href="#">ShopHub App Download</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-logo">
                    <span className="logo-text">ShopHub</span>
                </div>
                <div className="footer-legal">
                    <ul>
                        <li><a href="#">Conditions of Use & Sale</a></li>
                        <li><a href="#">Privacy Notice</a></li>
                        <li><a href="#">Interest-Based Ads</a></li>
                    </ul>
                    <span className="copyright">© 2019-{new Date().getFullYear()}, ShopHub.com, Inc. or its affiliates</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
