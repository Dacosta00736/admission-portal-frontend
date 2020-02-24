// PIE chart configuration setting
var config = {
  type: 'pie',
  data: {
    datasets: [{
      data: [ 40, 60 ],
      backgroundColor: [
        'rgba(255, 51, 0, 1)',
        'rgba(54, 162, 235, 0.8)'
      ],
      label: 'Percentage on scores'
    }],
    labels: [ 'Remains', 'percentage' ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true
  }
};

// load-up and populate chart with data
window.onload = function() {
  var ctx = document.getElementById('scorePercentage').getContext('2d');
  window.myPie = new Chart(ctx, config);
};