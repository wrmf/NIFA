var productList = [];

fetch('http://localhost:1337/all-questions')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        productList = products;
    })
    .catch(error => {
        console.error('Error:', error);
    })

setTimeout(() => {
    dataHub(productList);
}, 50);

function dataHub(data) {
    const seqData = sequential(data);
    insertData(seqData)
};

const regExL = new RegExp(/Learn/g);
const regExP = new RegExp(/Practice/g);
const regExT = new RegExp(/Test/g);

let seq = '1'

function sequential(data) {
    const newData = (Object.entries(data)[0][1]);

    if (seq > newData.length) {
        seq = 1;
    };

    if (seq < 1) {
        seq = newData.length;
    }

    if (seq != 1) {
        setCookie('learn', seq);
    };

    return Object.values(newData[seq - 1]);
};

function nextInSeq() {
    seq++
    dataHub(productList);
}

function prevInSeq() {
    seq--
    dataHub(productList);
}

function setCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + ((10*365+2)*24*60*60*1000));
    const date = d.toUTCString();
    
    document.cookie = name+"="+value+"; expires="+date+"; SameSite=None; secure";
};

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};


if (regExL.test(window.location.href)) {
    // var buttonNext = document.getElementById('next');
    // var buttonReturn = document.getElementById('return');
    // var buttonPrev = document.getElementById('prev');

    function insertData(data) {
        var cont = document.querySelector('main');
        cont.innerHTML = "";
        cont.insertAdjacentHTML('beforeend', `
            <img src="../img/Aircraft/${data[0] - 1}.png" alt="Photo of ${data[1]} ${data[2]}">
            <h2>${data[1]} ${data[2]} ${data[3]}</h2>
            <div class="dual">
                <div class="left" id="prev"><p>Previous</p></div>
                <div class="return" id="return"><p>Return to previously learnt aircraft</p></div>
                <div class="right" id="next"><p>Next</p></div>
            </div>
            <a href="PrimaryPage.html" class="leave">
                <p>Go back</p>
            </a>
        `)
        console.log(buttonNext)
        var buttonNext = document.getElementById('next');
        var buttonReturn = document.getElementById('return');
        var buttonPrev = document.getElementById('prev');

        buttonNext.addEventListener('click', function() {
            nextInSeq();
        });

        buttonPrev.addEventListener('click', function() {
            prevInSeq();
        });

        buttonReturn.addEventListener('click', function() {
            seq = getCookie('learn');
            dataHub(productList);
        });
    }
}