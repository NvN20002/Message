export const signMessage = async (message) => {
    const response = await fetch(`${API_URL}/sign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    // Log the response status and text
    console.log('Response Status:', response.status);
    const text = await response.text(); // Get the response as text
    console.log('Response Text:', text); // Log the response text

    if (!response.ok) {
        throw new Error('Failed to sign message');
    }

    return JSON.parse(text); // Parse the text as JSON
};
