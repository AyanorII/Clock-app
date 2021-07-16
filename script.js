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

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://world-time2.p.rapidapi.com/ip",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "f546e2202dmshd82cd4866940de5p11903ajsn95da340ff441",
        "x-rapidapi-host": "world-time2.p.rapidapi.com"
    }
};

const getTimeInfo = () => {
    $.ajax(settings).done(function (response) {
        const ipData = response;
        const city = ipData.timezone.split('/')[1];
        const continent = ipData.timezone.split('/')[0];
        const area = ipData.timezone;
    
        console.log(ipData);

        const hour = ipData.datetime.slice(11, 16);
        const timezone = ipData.abbreviation;
        const dayOfYear = ipData.day_of_year;
        const dayOfWeek = ipData.day_of_week;
        const weekNum = ipData.week_number;
        let greeting;
    
        console.log(city.split('_').join(' '))
    
        $('.hour').html(hour);
        $('.time-zone').html(timezone)
        $('.location').html(`In ${city.split('_').join(' ')}, ${continent}`)
    
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
setInterval(function () {
    getTimeInfo();
}, 60000)



const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
    $.getJSON('https://api.quotable.io/random', function (quoteAPI) {
        const quoteData = quoteAPI;
        let randomQuote = quoteData.content;
        let quoteAuthor = quoteData.author;
        $('.random-quote').html(randomQuote);
        $('.person').html(quoteAuthor);
    })
})