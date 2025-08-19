const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We’d love to hear from you! 💌  
        Reach out to us anytime.
      </p>

      <div className="contact-details">
        <p><b>Email:</b> support@foodieexpress.com</p>
        <p><b>Phone:</b> +91 98765 43210</p>
        <p><b>Address:</b> 123, Foodie Street, Delhi, India</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="form-input" />
        <input type="email" placeholder="Your Email" className="form-input" />
        <textarea placeholder="Your Message" className="form-textarea"></textarea>
        <button type="submit" className="form-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
