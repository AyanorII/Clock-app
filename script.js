const btn = $('.btn');
const mainContainer = document.querySelector('.main-container');
const footer = document.querySelector('.footer');

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        if (i === 0) {
            document.querySelector('.more').style.display = 'none';
            document.querySelector('.less').style.display = 'flex';
        }

        if (i === 1) {
            document.querySelector('.less').style.display = 'none';
            document.querySelector('.more').style.display = 'flex';
        }
        mainContainer.classList.toggle('show');
        footer.classList.toggle('show');
    })
}


$.getJSON('http://ip-api.com/json/', function(ipAPI) {
    const ipData = ipAPI;
    const city = ipData.timezone.split('/')[1];
    const continent = ipData.timezone.split('/')[0];
    const area = ipData.timezone;
    console.log(ipData.query)

    const getTimeInfo = () => {
        $.getJSON(`http://worldtimeapi.org/api/ip`, function(timeAPI) {
            const timeData = timeAPI;
            const hour = timeData.datetime.slice(11, 16);
            const timezone = timeData.abbreviation;
            const dayOfYear = timeData.day_of_year;
            const dayOfWeek = timeData.day_of_week;
            const weekNum = timeData.week_number;
            let greeting;
    
            console.log(timeData);
            console.log(hour);
            $('.hour').html(hour);
            $('.time-zone').html(timezone)
            $('.location').html(`In ${city}, ${continent}`)
    
            $('.timezone').html(area);
            $('.day-year').html(dayOfYear);
            $('.day-week').html(dayOfWeek);
            $('.week-number').html(weekNum);
    
            if (parseInt(hour) >= 5 && parseInt(hour) < 12) {
                greeting = 'Good morning';
                mainContainer.classList.remove('night');
                $('.fa-sun').show();
                $('.fa-moon').hide()
            } else if (parseInt(hour) >= 12 && parseInt(hour) < 18) {
                greeting = 'Good afternoon';
                mainContainer.classList.remove('night');
            } else if (parseInt(hour) >= 18 && parseInt(hour) <= 23 || parseInt(hour) >= 0 && parseInt(hour) < 5) {
                greeting = 'Good evening';
                mainContainer.classList.add('night');
                $('.fa-sun').hide()
                $('.fa-moon').show()
            }
    
            $('.morning-night').html(greeting)
        });
    }

    getTimeInfo();
    setInterval(function() {
        getTimeInfo();
    }, 60000)

});

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
    $.getJSON('https://api.quotable.io/random', function(quoteAPI) {
        const quoteData = quoteAPI;
        let randomQuote = quoteData.content;
        let quoteAuthor = quoteData.author;
        $('.random-quote').html(randomQuote);
        $('.person').html(quoteAuthor);
    }) 
})


