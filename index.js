const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and handle CORS
app.use(bodyParser.json());
app.use(cors());

// Helper function to process Base64 file
function processBase64File(fileB64) {
    if (!fileB64) return { isValid: false, fileMimeType: null, fileSizeKb: null };

    // Extract the MIME type and buffer from the Base64 string
    const matches = fileB64.match(/^data:(.*?);base64,(.+)$/);
    if (!matches) return { isValid: false, fileMimeType: null, fileSizeKb: null };

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const fileSizeKb = (buffer.length / 1024).toFixed(2); // Size in KB

    return { isValid: true, fileMimeType: mimeType, fileSizeKb: fileSizeKb };
}

// POST Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data = [], file_b64 = null } = req.body;
    const userId = "Snehalatha_1503";
    const email = "snehalatha_golla@srmap.edu.in";
    const rollNumber = "AP21110011336";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highestLowercaseAlphabet = alphabets.filter(item => /^[a-z]$/.test(item)).sort().reverse()[0] || null;

    const file = processBase64File(file_b64);

    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: file.isValid,
        file_mime_type: file.fileMimeType,
        file_size_kb: file.fileSizeKb
    };

    res.json(response);
});

// GET Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
