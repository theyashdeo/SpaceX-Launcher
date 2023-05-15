let api0 = 'https://api.spaceXdata.com/v3/launches?limit=100';

async function fetchData(api) {
  const response = await fetch(api);
  const data = await response.json();
  if (response) {
    hideLoader();
  }
  console.log(data);

  let content = '';
  if (data.length === 0) {
    content = `<h1>No Data Found.</h1>`;
  } else {
    for (let element of data) {
      let details = element.details !== null ? element.details : 'No Information Available';
      content += `
        <div class="card">
          <img src="${element.links.mission_patch}" alt="Avatar" style="width:100%">
          <div class="container">
            <div class="flight-info">
              <span class="mission-name"><strong style="font-size: 22px;">${element.mission_name}</strong></span>
              <span class="flight-number"><strong style="font-size: 22px;">#${element.flight_number}</strong></span>
              <div><strong style="font-size: 12px;">Launch Year:</strong> ${element.launch_year}</div>
              <div><strong style="font-size: 12px;">Successful Launch:</strong> ${element.launch_success}</div>
              <div><strong style="font-size: 12px;">Successful Landing:</strong> ${element.land_success}</div>
            </div>
            <div class="button-container">
              <a href="${element.links.wikipedia}" alt="video link" target="_blank" class="details">View Details</a>
              <a href="${element.links.video_link}" alt="video link" target="_blank" class="details">Video</a>
            </div>
          </div>
        </div>
      `;
    }
  }
  document.getElementById('flights').innerHTML = content;
}

fetchData(api0);

// Function to hide the loader
function hideLoader() {
  document.getElementById('loading').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit').addEventListener('click', () => {
    let year = document.getElementById('year');
    let launch = document.getElementById('launch');
    let land = document.getElementById('landing');

    if (year.value === '') {
      let api1 = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch.value}&land_success=${land.value}`;
      fetchData(api1);
    } else if (year.value !== '') {
      let api2 = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${launch.value}&land_success=${land.value}&launch_year=${year.value}`;
      fetchData(api2);
    }
  });

  document.querySelectorAll('button').forEach(function(button) {
    button.onclick = function() {
      let api1 = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=false&land_success=false&launch_year=${button.dataset.year}`;
      fetchData(api1);
    }
  });

  let date = document.getElementsByName('date');
  date.addEventListener('click', (date) => {
    let api1 = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${date.value}`;
    fetchData(api1);
  });
});
