function setCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + ((10*365+2)*24*60*60*1000));
    const date = d.toUTCString();
    
    document.cookie = name+"="+value+"; SameSite=None; secure";
};

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

var tagSelect = document.getElementById('tagSelect');

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
    var tagsFiltered = tagFilter(productList);
    tagInsert(tagsFiltered);
}, 50);

var tags = [];

function tagFilter() {
    var objects = (Object.entries(productList)[0][1]);
    objects.forEach((element) => {
        tags.push(Object.entries(element)[13][1]);
    });
    
    return removeDuplicates(tags);
};

// Credit to https://builtin.com/software-engineering-perspectives/remove-duplicates-from-array-javascript.
function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
}


function tagInsert(tagsFiltered) {
    tagSelect.innerHTML = '<option value="selectATag">Select A Tag</option>';
    
    tagsFiltered.forEach((element) => {
        tagSelect.insertAdjacentHTML('beforeend', `<option value="${element}">${element}</option>`);
    });
};

tagSelect.addEventListener('change', () => {
    setCookie('tag', tagSelect.value);

    console.log(getCookie('tag'));
});