import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyC723kx6S0GHAYI7Zj_7fESGpv_7x92RSU";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.formattedAddress',
            'places.shortFormattedAddress',
            'places.location',
            'places.goodForGroups',
            'places.servesBeer',
            'places.photos', 'places.id']
    }
}

const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);


export default {
    NewNearByPlace,
    API_KEY
}