fetch("https://api.tvmaze.com/shows?&select=key1,key2,key3").then(response => response.json()).then(data => {
    console.log(data);
});