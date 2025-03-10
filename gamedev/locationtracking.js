import axios from 'axios';

async function getGeoLocation() {
    const apiKey = "AIzaSyBYPZyFFX2wm_TAr1haKfFJGMlDbHkF8TQ"; 
    const macAddress = "12:34:56:78:9a:bc";

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

// Call getGeoLocation every 10 seconds
setInterval(getGeoLocation, 10000);
