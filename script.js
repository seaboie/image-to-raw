document.getElementById('convertBtn').addEventListener('click', function() {
    const blobUrlInput = document.getElementById('blobUrl');
    const blobUrl = blobUrlInput.value; // Get the current value of the input field
    const rawUrl = convertGithubBlobToRaw(blobUrl);
    
    const rawUrlElement = document.getElementById('rawUrl');
    rawUrlElement.innerHTML = ''; // Clear previous content

    if (rawUrl) {
        // Create a clickable link
        const link = document.createElement('a');
        link.href = rawUrl;
        link.target = '_blank'; // Open in a new tab
        link.textContent = rawUrl; // Display the URL as the link text
        
        // Append the link to the rawUrl paragraph
        rawUrlElement.appendChild(link);

        // Create a copy icon
        const copyIcon = document.createElement('i');
        copyIcon.className = 'fas fa-copy copy-icon'; // Font Awesome copy icon
        copyIcon.onclick = function() {
            navigator.clipboard.writeText(rawUrl).then(() => {
                alert("Copied to clipboard!");
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        };

        // Append the copy icon next to the link
        rawUrlElement.appendChild(copyIcon);
        
    } else {
        rawUrlElement.textContent = 'Invalid GitHub blob URL';
    }

    // Clear the input field after conversion
    blobUrlInput.value = ''; // Set input value to an empty string
});

function convertGithubBlobToRaw(blobUrl) {
    if (blobUrl.includes("github.com") && blobUrl.includes("/blob/")) {
        const rawUrl = blobUrl
            .replace("/blob/", "/")
            .replace("https://github.com/", "https://raw.githubusercontent.com/");
        
        return rawUrl; // Return full URL including filename
    }
    return null; // Return null for invalid URLs
}
