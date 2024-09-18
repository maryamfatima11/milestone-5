// Add an event listener to the form
document.getElementById('resumeForm')?.addEventListener('submit', function(event: Event) {
    event.preventDefault();
  
    // Get form elements
    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement | null;
    const usernameElement = document.getElementById('username') as HTMLInputElement | null;
    const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement | null;
  
    // Check if all elements exist
    if (
        nameElement && emailElement && phoneElement &&
        educationElement && experienceElement && skillsElement && usernameElement
    ) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
  
        // Create the resume HTML content
        let resumeHTML = `
            <h2>Resume</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;
  
        // Display the generated resume
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
  
            // Handle profile picture display
            if (profilePictureElement?.files?.length) {
                const file = profilePictureElement.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target?.result as string;
                    img.alt = 'Profile Picture';
                    img.style.maxWidth = '150px';
                    img.style.maxHeight = '150px';
                    img.style.display = 'block';
                    img.style.margin = '0 auto';
                    img.style.borderRadius = '50%'; // Circular image
                    img.style.objectFit = 'cover';  // Ensure the image fills the circle properly
  
                    resumeOutputElement.insertBefore(img, resumeOutputElement.firstChild);
                };
                reader.readAsDataURL(file);
            }
  
            // Add buttons for downloading and sharing the resume
            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = 'buttonsContainer';
            resumeOutputElement.appendChild(buttonsContainer);
  
            // Download button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download as PDF';
            downloadButton.addEventListener('click', () => {
                window.print();
            });
            buttonsContainer.appendChild(downloadButton);
  
            // Share link button
            const shareLinkButton = document.createElement('button');
            shareLinkButton.textContent = 'Copy Sharable Link';
            shareLinkButton.addEventListener('click', async () => {
                try {
                    const shareableLink = `https://yourdomain.com/resumes/${username.replace(/\s+/g, '_')}_cv.html`;
                    await navigator.clipboard.writeText(shareableLink);
                    alert('Shareable link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy link: ', err);
                    alert('Failed to copy link to clipboard. Please try again.');
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        } else {
            console.error('Resume output container not found');
        }
    } else {
        console.error('Form elements are missing');
    }
  });