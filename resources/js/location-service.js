// Location detection functionality
class LocationService {
    constructor() {
        this.countriesData = null;
        this.init();
    }

    async init() {
        await this.loadCountriesData();
        await this.updateTargetLocation();
    }

    async fetchJson() {
        try {
            const response = await fetch("/assets/js/countries_list.json");
            const data = await response.json();
            return data.countries;
        } catch (error) {
            console.error('Error fetching countries data:', error);
            return [];
        }
    }

    async getUserLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const location = await response.json();
            return location.country_name;
        } catch (error) {
            console.error('Error fetching user location:', error);
            return null;
        }
    }

    async loadCountriesData() {
        this.countriesData = await this.fetchJson();
    }

    async updateTargetLocation() {
        if (!this.countriesData) return;

        const userCountry = await this.getUserLocation();
        
        if (userCountry) {
            const countryData = this.countriesData.find(country => country.country === userCountry);
            if (countryData) {
                const targetElement = document.getElementById('target-location');
                if (targetElement) {
                    targetElement.textContent = countryData.target_capital;
                }
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LocationService();
});
