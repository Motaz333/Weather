
// Toggle navigation menu visibility
function toggleNav() {
    let menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Global list to hold API results
let list = [];

// Fetch weather data from the API
async function getdata(type = "zagazig") {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=53647d0077634b319ab161316241112&q=${type}&days=3`);
        if (!response.ok) throw new Error("Failed to fetch data");
        
        let data = await response.json();
        list = [data]; 
        display();
    } catch (error) {
        console.error("Error fetching data:", error);
        
    }
}


function display() {
    let forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; 

    list.forEach(weather => {
        const { location, forecast } = weather;
        forecast.forecastday.forEach((day, index) => {
            if (index === 0) {
                forecastContainer.innerHTML += `
                    <div class="today forecast">
                        <div class="forecast-header">
                            <div class="day">${new Date(day.date).toLocaleDateString("en-US", { weekday: 'long' })}</div>
                            <div class="date">${new Date(day.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric' })}</div>
                        </div>
                        <div class="forecast-content">
                            <div class="location" style="color: muted; font-size:30px;">${location.name}</div>
                            <div class="degree">
                                <div class="num">${day.day.avgtemp_c}<sup>o</sup>C</div>
                                <div class="forecast-icon">
                                    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="width:120%;">
                                </div>
                            </div>
                            <div class="custom">${day.day.condition.text}</div>
                            <span style="color: #009ad8;"><img src="icon-umberella.png" alt="">${day.day.daily_chance_of_rain || 0}%</span>
                            <span style="color: #009ad8;"><img src="icon-wind.png" alt="">${day.day.maxwind_kph} km/h</span>
                            <span style="color: #009ad8;"><img src="icon-compass.png" alt="">${day.day.wind_dir}</span>
                        </div>
                    </div>
                `;
            } else {
                
                forecastContainer.innerHTML += `
                    <div class="forecast">
                        <div class="forecast-header">
                            <div class="day">${new Date(day.date).toLocaleDateString("en-US", { weekday: 'long' })}</div>
                        </div>
                        <div class="forecast-content">
                            <div class="forecast-icon">
                                 <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" width="55">
                            </div>
                            <div class="degree">${day.day.avgtemp_c}<sup>o</sup>C</div>
                            <small style="font-size: 18px;" >${day.day.mintemp_c}<sup>o</sup></small>
                            <div class="custom">${day.day.condition.text}</div>
                        </div>
                    </div>
                `;
            }
        });
    });
}



// Add event listener for the input field
document.getElementById("search").addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query) {
        getdata(query); // Fetch data immediately
    }
});

// Initial fetch for default location
getdata();

