const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <p className="about-text">
        Welcome to <span className="highlight">FoodieExpress</span>, your one-stop
        destination for delicious meals delivered right to your door. We believe
        food should be quick, affordable, and satisfying — without compromising
        on taste.
      </p>

      <h2 className="about-subtitle">Why Choose Us?</h2>
      <ul className="about-list">
        <li>🍕 Wide variety of restaurants and cuisines</li>
        <li>⚡ Fast and reliable delivery</li>
        <li>💳 Easy and secure online payments</li>
        <li>🌱 Fresh ingredients and hygienic packaging</li>
      </ul>

      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-text">
        Our mission is to bring people closer to their favorite food by making
        ordering as easy as tapping a button. Whether you crave street food or
        gourmet meals, we've got you covered.
      </p>

      <h2 className="about-subtitle">Contact Us</h2>
      <p className="about-text">
        Have feedback or questions? Reach us at{" "}
        <span className="highlight">support@foodieexpress.com</span>
      </p>
    </div>
  );
};

export default About;