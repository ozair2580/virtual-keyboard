import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic here (e.g., check username/password)
    // For now, just display form data in console
    console.log('Form submitted with data:', formData);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
