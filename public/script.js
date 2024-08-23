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
}, 100);

const regExL = new RegExp(/learn/g);
const regExP = new RegExp(/practice/g);
const regExT = new RegExp(/test/g);
var usedRandomP = [];
var usedRandomT = [];
let cPr = 0;

function dataHub(data) {
    var tagSelected = getCookie('tag');
    var processedData = Object.entries(data)[0][1];
    var tagfilteredData = [];

    processedData.forEach((element) => {
        if (Object.values(element)[13] == tagSelected || tagSelected == 'selectATag') {
            tagfilteredData.push(element);
        };
    });

    console.log(tagfilteredData)

    // No, the console log does not need to be here. However, for some reason, if I remove this holy console.log, the entire thing breaks. I am also aware it floods console, I noticed that during testing. Unfortunately, moving it anywhere apart from in this one function results in everything falling apart.
    console.log(regExL.test(window.location.href.toLowerCase()), "I'm sorry, random user who checked the console. This doesn't need to be here, or at least it wouldn't, but if I remove it, everything breaks. All three of these console logs are holy and I shalln't touch them.");
    console.log(regExT.test(window.location.href.toLowerCase()));
    console.log(regExP.test(window.location.href.toLowerCase()));

    
    if (regExL.test(window.location.href.toLowerCase()) == true) {
        const Data = sequential(tagfilteredData);
        insertData(Data);
    };
    
    if (regExP.test(window.location.href.toLowerCase()) == true) {
        const Data = random(tagfilteredData);
        insertData(Data);
    };
    
    if (regExT.test(window.location.href.toLowerCase()) == true) {
        const Data = random(tagfilteredData);
        insertData(Data);
    };
};

let seq = '1'

function sequential(data) {
    const newData = data;

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


function random(data) {
    const newData = data;;
    let hasFiredrandom = false;

    if (hasFiredrandom == false) {
        shuffle(newData);
        hasFiredrandom = true;
    }
    
    if (newData.length == 1) {
        shuffle(newData);
    };

    usedRandomP.push(newData[cPr]);
    cPr++;


    if (cPr == newData.length) {
        cPr = 1;
    };

    console.log(usedRandomP, cPr);

    console.log(newData)

    return Object.values(usedRandomP[cPr - 1]);
}

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

// Yes. This is inefficient. Yes. I could move line 91 and 92 around. However, if I do that, for no reason other than JavaScript being JavaScript, the code will be terribly slow. 
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
    console.log(arr)
    var k = arr.length, j, temp;
    while(--k > 0){
      j = Math.floor(Math.random()*(k+1));
      temp = arr[j];
      arr[j] = arr[k];
      arr[k] = temp;
    }
    console.log(arr)
}

var q = 0;
var s = 0;

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
                <div id="qindicator"><p></p></div>
               <hr>
               <div id="score"><p></p></div>
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
                    <li><p class="altnameP">${shuffledAltName[0]}</p></li>
                    <li><p class="altnameP">${shuffledAltName[1]}</p></li>
                    <li><p class="altnameP">${shuffledAltName[2]}</p></li>
                    <li><p class="altnameP">${shuffledAltName[3]}</p></li>
                </ul>
                <div class="buttons">
                    <button id="submit"><p>Submit</p></button>
                    <p id="skip">Next Question</p></div>
                </div>
            </div>
            <a href="../Quiz/PrimaryPage.html" class="leave">
                <p>Go back</p>
            </a>
        `)

        const correctRegex = new RegExp(`${data[1]}|${data[2]}|${data[3]}`);

        var submit = document.getElementById('submit');
        var nextQ = document.getElementById('skip');
        var qindicator = document.getElementById('qindicator');
        var score = document.getElementById('score');

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
                selected[0] = element;
            });
        });

        modelP.forEach((element) => {
            element.addEventListener('click', function() {
                modelP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[1] = element;
            });
        });

        altnameP.forEach((element) => {
            element.addEventListener('click', function() {
                altnameP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[2] = element;
            });
        });

        var hasFired = false;

        submit.addEventListener('click', function() {
            if (hasFired == true) {
                return;
            };

            hasFired = true;

            console.log(selected)

            if (selected[0] == undefined) {
                selected[0] = 'none';
            };

            if (selected[1] == undefined) {
                selected[1] = 'none';
            };

            if (selected[2] == undefined) {
                selected[2] = 'none';
            };

            var subMan = selected[0].textContent;
            var subMod = selected[1].textContent;
            var subAlt = selected[2].textContent;

            if (correctRegex.test(subMan) == true) {
                selected[0].classList.remove('selected');
                selected[0].classList.add('correct');
            } else {
                if (selected[0] != 'none') {
                    selected[0].classList.remove('selected');
                    selected[0].classList.add('wrong');
                }
                
                manufacturerP.forEach((element) => {
                    if (selected[0] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subMod) == true) {
                selected[1].classList.remove('selected');
                selected[1].classList.add('correct');
            } else {
                if (selected[1] != 'none') {
                    selected[1].classList.remove('selected');
                    selected[1].classList.add('wrong');
                }

                modelP.forEach((element) => {
                    if (selected[1] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subAlt) == true) {
                selected[2].classList.remove('selected');
                selected[2].classList.add('correct');
            } else {
                if (selected[2] != 'none') {
                    selected[2].classList.remove('selected');
                    selected[2].classList.add('wrong');
                }

                altnameP.forEach((element) => {
                    if (selected[2] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subMan) == true && correctRegex.test(subMod) == true && correctRegex.test(subAlt) == true) {
                s++;
                score.innerHTML = "";
                score.insertAdjacentHTML('beforeend', `<p>Score: ${s}</p>`);
            }
        });

        nextQ.addEventListener('click', function() {
            q++;
            nextInSeq();
            console.log(q, 'gjfdkshg')
        });

        qindicator.innerHTML = "";
        qindicator.insertAdjacentHTML('beforeend', `<p>Question ${q + 1}</p>`);
        console.log(q)

        score.innerHTML = "";
        score.insertAdjacentHTML('beforeend', `<p>Score: ${s}</p>`);
    };
};

if (regExT.test(window.location.href.toLowerCase()) == true) {
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
            <div id="cover">
                <img src="../img/Aircraft/${data[0] - 1}.png" alt="${data[1]} ${data[2]}" id="disappearingImg">
            </div>
            <h2>What is the manufacturer?</h2>
            <ul id="manufacturerUl">
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
                <li><p class="altnameP">${shuffledAltName[0]}</p></li>
                <li><p class="altnameP">${shuffledAltName[1]}</p></li>
                <li><p class="altnameP">${shuffledAltName[2]}</p></li>
                <li><p class="altnameP">${shuffledAltName[3]}</p></li>
            </ul>
            <div class="buttons">
                <button id="submit"><p>Submit</p></button>
                <p id="skip">Next Question</p></div>
            </div>
            <a href="PrimaryPage.html" class="leave">
                <p>Go back</p>
            </a>
        `)

        const correctRegex = new RegExp(`${data[1]}|${data[2]}|${data[3]}`);

        var submit = document.getElementById('submit');
        var nextQ = document.getElementById('skip');

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
                selected[0] = element;
            });
        });

        modelP.forEach((element) => {
            element.addEventListener('click', function() {
                modelP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[1] = element;
            });
        });

        altnameP.forEach((element) => {
            element.addEventListener('click', function() {
                altnameP.forEach((element) => {
                    element.classList.remove('selected');
                });
                element.classList.add('selected');
                selected[2] = element;
            });
        });

        var hasFired = false;

        submit.addEventListener('click', function() {
            if (hasFired == true) {
                return;
            };

            hasFired = true;

            console.log(selected)

            if (selected[0] == undefined) {
                selected[0] = 'none';
            };

            if (selected[1] == undefined) {
                selected[1] = 'none';
            };

            if (selected[2] == undefined) {
                selected[2] = 'none';
            };

            var subMan = selected[0].textContent;
            var subMod = selected[1].textContent;
            var subAlt = selected[2].textContent;

            if (correctRegex.test(subMan) == true) {
                selected[0].classList.remove('selected');
                selected[0].classList.add('correct');
            } else {
                if (selected[0] != 'none') {
                    selected[0].classList.remove('selected');
                    selected[0].classList.add('wrong');
                }
                
                manufacturerP.forEach((element) => {
                    if (selected[0] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subMod) == true) {
                selected[1].classList.remove('selected');
                selected[1].classList.add('correct');
            } else {
                if (selected[1] != 'none') {
                    selected[1].classList.remove('selected');
                    selected[1].classList.add('wrong');
                }

                modelP.forEach((element) => {
                    if (selected[1] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subAlt) == true) {
                selected[2].classList.remove('selected');
                selected[2].classList.add('correct');
            } else {
                if (selected[2] != 'none') {
                    selected[2].classList.remove('selected');
                    selected[2].classList.add('wrong');
                }

                altnameP.forEach((element) => {
                    if (selected[2] == 'none') {
                        element.classList.add('wrong');
                    }
                    if (correctRegex.test(element.textContent) == true) {
                        element.classList.remove('wrong');
                        element.classList.add('correct');
                    }
                });
            }

            if (correctRegex.test(subMan) == true && correctRegex.test(subMod) == true && correctRegex.test(subAlt) == true) {
                s++;
                setCookie('highscore', s)
            }
        });

        nextQ.addEventListener('click', function() {
            q++;
            nextInSeq();
        });

        setTimeout(() => {
            document.getElementById('cover').classList.add('hidden')
        }, 3000);
    };
}