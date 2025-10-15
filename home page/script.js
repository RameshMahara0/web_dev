// Show destination image preview
document.getElementById('to').addEventListener('change', function() {
    const selectedOption = this.selectedOptions[0];
    const img = selectedOption.dataset.img;
    const preview = document.getElementById('destPreview');
    if(img) {
        preview.src = img;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
});

// Trip form submission
document.getElementById('tripForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const from = document.getElementById('from').value; // always Bangalore
    const to = document.getElementById('to').value.trim();
    const days = parseInt(document.getElementById('days').value);

    if (!to) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Info',
            text: 'Please select a destination.',
            confirmButtonColor: '#FF5733'
        });
        return;
    }

    if (isNaN(days)) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Info',
            text: 'Please select number of days.',
            confirmButtonColor: '#FF5733'
        });
        return;
    }

    // Store trip info
    localStorage.setItem('tripData', JSON.stringify({from, to, days}));

    Swal.fire({
        title: 'Trip Planned! 🎒',
        html: `<p><b>From:</b> ${from}</p>
               <p><b>To:</b> ${to}</p>
               <p><b>Days:</b> ${days}</p>`,
        icon: 'success',
        confirmButtonText: 'View Summary',
        confirmButtonColor: '#FF5733'
    }).then((result) => {
        if(result.isConfirmed) window.location.href = 'trip-summary.html';
    });

    this.reset();
    document.getElementById('destPreview').style.display = 'none';
});
