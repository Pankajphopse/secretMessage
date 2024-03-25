const token = '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';
const repoOwner = 'Pankajphopse';
const repoName = 'secretMessage';
const filePath = 'data.txt';

const updateFile = async (data) => {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Update data.txt',
      content: btoa(unescape(encodeURIComponent(data))),
      sha: 'SHA_OF_EXISTING_FILE',
    }),
  });

  if (response.ok) {
    console.log('File updated successfully');
  } else {
    console.error('Failed to update file:', response.statusText);
  }
};

//Example usage: updateFile('New content to be written to data.txt');
