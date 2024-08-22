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

const regExL = new RegExp(/learn/g);
const regExP = new RegExp(/practice/g);
const regExT = new RegExp(/test/g);

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

// Yes. This is inefficient. Yes. I could move line 76 and 75 around. However, if I do that, for no reason other than JavaScript being JavaScript, the code will be terribly slow. 
if (regExL.test(window.location.href.toLowerCase()) == true) {
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
    };
};

// Credit to @Álvaro González on StackOverflow. Link: https://stackoverflow.com/a/59837259
function shuffle(arr) {
    var k = arr.length, j, temp;
    while(--k > 0){
      j = Math.floor(Math.random()*(k+1));
      temp = arr[j];
      arr[j] = arr[k];
      arr[k] = temp;
    }
}

if (regExP.test(window.location.href.toLowerCase()) == true) {
    function insertData(data) {
        var shuffledManufacturer = [data[1], data[4], data[5], data[6]]
        shuffle(shuffledManufacturer);

        var shuffledModel = [data[2], data[7], data[8], data[9]]
        shuffle(shuffledModel);

        var shuffledAltName = [data[3], data[10], data[11], data[12]]
        shuffle(shuffledAltName);

        var cont = document.querySelector('main');
        cont.innerHTML = "";
        cont.insertAdjacentHTML('beforeend', `
            <img src="../img/Aircraft/${data[0] - 1}.png" alt="Photo of ${data[1]} ${data[2]}">
            <div class="central">
                <div id="qindicator"><p>Question </p></div>
               <hr>
               <div id="score"><p>Score: 0<!-- #Score derived from calculation here --></p></div>
            </div>
            <div class="questions">
                <h2>What is the manufacturer?</h2>
               <ul>
                   <li><p class="manufacturerP">${shuffledManufacturer[0]}</p></li>
                   <li><p class="manufacturerP">${shuffledManufacturer[1]}</p></li>
                   <li><p class="manufacturerP">${shuffledManufacturer[2]}</p></li>
                   <li><p class="manufacturerP">${shuffledManufacturer[3]}</p></li>
                </ul>
                <h2>What is the model?</h2>
                <ul>
                    <li><p class="modelP">${shuffledModel[0]}</p></li>
                    <li><p class="modelP">${shuffledModel[1]}</p></li>
                    <li><p class="modelP">${shuffledModel[2]}</p></li>
                    <li><p class="modelP">${shuffledModel[3]}</p></li>
                </ul>
                <h2>What is the common name?</h2>
                <ul>
                    <li><p class="altnameP">${shuffledModel[0]}</p></li>
                    <li><p class="altnameP">${shuffledModel[1]}</p></li>
                    <li><p class="altnameP">${shuffledModel[2]}</p></li>
                    <li><p class="altnameP">${shuffledModel[3]}</p></li>
                </ul>
                <div class="buttons">
                    <button id="submit"><p>Submit</p></button>
                    <p id="skip">Next Question</p></div>
                </div>
            </div>
            <a href="/menu" class="leave">
                <p>Go back</p>
            </a>
        `)

        const correctRegex = new RegExp(/${data[1]}, /g);

        var submit = document.getElementById('submit');
        var nextQ = document.getElementById('skip');
        var qindicator = document.getElementById('qindicator');
        var score = document.getElementById('score');

        var q = 0;
        var s = 0;

        var manufacturerP = document.querySelectorAll('.manufacturerP');
        var modelP = document.querySelectorAll('.modelP');
        var altnameP = document.querySelectorAll('.altnameP');

        var selected = [];

        manufacturerP.forEach((element) => {
            element.addEventListener('click', function() {
                manufacturerP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[0] = element.textContent;
            });
        });

        modelP.forEach((element) => {
            element.addEventListener('click', function() {
                modelP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[1] = element.textContent;
            });
        });

        altnameP.forEach((element) => {
            element.addEventListener('click', function() {
                altnameP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[2] = element.textContent;
            });
        });

        submit.addEventListener('click', function() {
            console.log(selected.toString())
        });

        nextQ.addEventListener('click', function() {
            console.log('gfkdlsghfdikjsgh')
        });
    };
};