// Define the updateFile function to update the data.txt file
const updateFile = async (data) => {
  try {
    const token = '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'; // Your personal access token
    const repoOwner = 'Pankajphopse'; // Owner of the repository
    const repoName = 'secretMessage'; // Name of the repository
    const filePath = 'data.txt'; // Path to the data.txt file in the repository

    // Get the SHA hash of the existing content of the data.txt file
    const fileSha = await getFileSha();

    // Construct the API URL for updating the data.txt file
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    // Make a PUT request to update the data.txt file with the new content
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update data.txt',
        content: btoa(unescape(encodeURIComponent(data))),
        sha: fileSha,
      }),
    });

    // Check if the request was successful
    if (response.ok) {
      console.log('File updated successfully');
    } else {
      throw new Error(`Failed to update file: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// Define the getFileSha function to get the SHA hash of the existing content of the data.txt file
const getFileSha = async () => {
  try {
    const token = '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'; // Your personal access token
    const repoOwner = 'Pankajphopse'; // Owner of the repository
    const repoName = 'secretMessage'; // Name of the repository
    const filePath = 'data.txt'; // Path to the data.txt file in the repository

    // Construct the API URL for fetching the data.txt file content
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    // Make a GET request to fetch the data.txt file content
    const response = await fetch(apiUrl);

    // Check if the request was successful
    if (response.ok) {
      // Extract and return the SHA hash of the data.txt file
      const data = await response.json();
      return data.sha;
    } else {
      throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Add an event listener to the submit button to execute the updateFile function
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedbackForm");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Construct the data string to be written to the data.txt file
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    // Call the updateFile function with the form data
    await updateFile(data);

    // Optionally, you can reset the form after submitting
    form.reset();
  });
});
