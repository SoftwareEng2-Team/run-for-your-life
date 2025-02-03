import axios from 'axios';

async function getGeoLocation() {
    const apiKey = "AIzaSyBYPZyFFX2wm_TAr1haKfFJGMlDbHkF8TQ"; // Replace with your API key
    const macAddress = "12:34:56:78:9a:bc"; // Example MAC address

    try {
        const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
            wifiAccessPoints: [
                {
                    macAddress: macAddress,
                    signalStrength: -65,
                    signalToNoiseRatio: 40
                }
            ]
        });

        const { location } = response.data;
        console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    } catch (error) {
        console.error("Error fetching geolocation:", error.response?.data || error.message);
    }
}

getGeoLocation();
