  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to register the user, e.g., sending a request to an API endpoint
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Handle successful registration
        console.log('User registered successfully!');
        // Redirect to a different page or display a success message
      } else {
        // Handle registration error
        console.error('Registration failed!');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Display an error message to the user
    }
  };