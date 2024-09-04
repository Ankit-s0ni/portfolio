const scriptURL = 'https://script.google.com/macros/s/AKfycbwq0alh05664ENBVz-DWGBSyKjoSA280l-nmhiNKMLwx-8ioAeslzucWHSx9BdQPL-wLw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form Data:', ...formData.entries()); // Log form data

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            console.log('Response:', response); // Log response
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text(); // or response.json() based on your script's response
        })
        .then(data => {
            console.log('Data:', data); // Log data
            msg.innerHTML = "Thank You For your response";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 1000);
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "An error occurred. Please try again.";
        });
});
