console.log('testing')

// -------- Maps --------

var map;
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(37.368917, -121.941457), zoom: 10});


  var features = [
    {
      position: new google.maps.LatLng(37.362840, -121.949102),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.338162, -121.968841),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.387244, -121.981709),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.332190, -121.897427),
      type: 'info'
    }, {
      position: new google.maps.LatLng(37.403268, -121.870475),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.444022, -121.939624),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.359853, -122.088024),
      // type: 'info'
    }, {
      position: new google.maps.LatLng(37.312627, -122.012996),
      // type: 'info'
    }, 
    {
      position: new google.maps.LatLng(37.362941, -122.034480),
      // type: 'info'
    }, 
    {
      position: new google.maps.LatLng(37.282059, -121.873076),
      // type: 'info'
    }, 
    {
      position: new google.maps.LatLng(37.742423, -122.437720),
      // type: 'info'
    }, 
  ];

  // Create markers.
  for (var i = 0; i < features.length; i++) {
    var marker = new google.maps.Marker({
      position: features[i].position,
      // icon: icons[features[i].type].icon,
      map: map
    });
  };
}



// -------- Firebase --------
db.collection('patients').get().then((snapshot) =>{
  snapshot.docs.forEach(doc => {
    renderPatients(doc)
  });
});

// -------- render patient info --------
const patientList = document.querySelector('#patients');

function renderPatients(doc){
 
  let li = document.createElement('li');

  let patient_id = document.createElement('span');
  let age = document.createElement('span');
  let location = document.createElement('span');
  let vitals = document.createElement('span');
  let symptopms_span = document.createElement('span');
  let diagnosis_span = document.createElement('span');
  let risk = document.createElement('span');
  let status = document.createElement('span');

  li.setAttribute('patients-id', doc.id);
  // console.log(doc.id)
  patient_id.textContent = doc.data().patient_id;
  age.textContent = doc.data().age;
  location.textContent = JSON.stringify(doc.data().location);
  vitals.textContent = doc.data().vitals;
  symptopms_span.textContent = doc.data().symptopms_span;
  diagnosis_span.textContent = doc.data().diagnosis_span;
  risk.textContent = doc.data().risk;
  status.textContent = doc.data().status;


  li.appendChild(patient_id);
  li.appendChild(age);
  li.appendChild(location);
  li.appendChild(vitals);
  li.appendChild(symptopms_span);
  li.appendChild(diagnosis_span);
  li.appendChild(risk);
  li.appendChild(status);

  patientList.appendChild(li);
}


// -------- Highcharts -------- 
Highcharts.chart('container', {
  chart: {
    type: 'area'
  },
  title: {
    text: 'COVID-19 PATIENTS'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },
  credits:{
    enabled: false
  },  
  exporting: {
    enabled: true
  },
  yAxis: {
    title: {
      text: 'Patients (thousands)'
    },
    labels: {
      formatter: function () {
        return this.value / 1000;
      }
    }
  },
  tooltip: {
    split: true,
    valueSuffix: ' millions'
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#666666'
      }
    }
  },
  series: [{
    name: 'North America',
    data: [502, 635, 809, 947, 1002, 1200, 1500]
  }, {
    name: 'Africa',
    data: [106, 107, 111, 133, 122, 101,155]
  }, {
    name: 'Europe',
    data: [163, 203, 276, 408, 547, 729, 628]
  }, {
    name: 'Asia',
    data: [18, 31, 54, 156, 339, 818, 1201]
  }]
});