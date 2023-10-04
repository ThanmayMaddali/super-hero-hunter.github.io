// Public API : b4cca04eec1ffc2535c695e4d59886ae
//Hash : f943510484d7743b26ebec18ed58276c


document.getElementById("search-form").addEventListener('keyup',function(){
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();
    xhrRequest.onload=function(){
        var data = JSON.parse(xhrRequest.responseText);
        display(data);
    }
});


function getUrl(){
    var searchQuery = document.getElementById("search-string").value;
    console.log(searchQuery);
    document.getElementById('querySection').innerHTML="You have searched for : " + searchQuery;
    if(!searchQuery){
        console.log("Name cannot br None");
        return "http://gateway.marvel.com/v1/public/comics?ts=1696138599392&apikey=b4cca04eec1ffc2535c695e4d59886ae&hash=f943510484d7743b26ebec18ed58276c"
    }else{
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=b4cca04eec1ffc2535c695e4d59886ae&hash=f943510484d7743b26ebec18ed58276c&ts=1696138599392`
    }


}




let canvas = document.getElementById("canvas");


let searchHero = document.getElementById('search-string').value;


function display(data){
    var searchHeroList = document.getElementById('superhero-list');
    searchHeroList.innerHTML="";
    var results = data.data.results;
    console.log(results);
    if(!results){
        document.getElementById('search-character').value="";
        window.alert("not found");
    }
    else{
        for(let result of results){
            var templateCanvas = canvas.content.cloneNode(true);
            templateCanvas.getElementById("photo").innerHTML=`<div class="card-cont">
            <img src="${result.thumbnail["path"]+"."+result.thumbnail["extension"]}"/>
            </div>`
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;
            templateCanvas.getElementById('learn-more').addEventListener('click', function(){
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });
            templateCanvas.getElementById('fav').addEventListener('click', function(){
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id,data);
            });
            searchHeroList.appendChild(templateCanvas);

        }
    }
};
function addFunction(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }