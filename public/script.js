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
    console.log(seqData);
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

    if (seq != 1) {
        setCookie('learn', seq);
    };

    return newData[seq - 1];
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

