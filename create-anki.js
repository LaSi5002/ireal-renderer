console.log("test")

const fs = require('fs');
const Playlist = require('./src/ireal-reader-tiny');
const iRealRenderer = require('./src/ireal-renderer');
const { JSDOM } = require('jsdom');

// Ein virtuelles DOM erstellen
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

// Das virtuelle `document`-Objekt nutzen
const document = dom.window.document;


console.log(document.body.innerHTML);


var playlist;

var options = {
    minor: "minus",
    transpose: 0,
    useH: false,
    hilite: true
};


const playlist_string = fs.readFileSync('Jazz 1410.html', 'utf8');

var playlist = new Playlist(playlist_string)





cards = []

for (i = 0; i < 2; i++)
{
    cards.push(createCard(playlist.songs[i]))
}


upper = '<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="demo.css"><link rel="stylesheet" href="css/ireal-renderer.css">'
lower = '</head></html>'
function createCard(song)
{
    const container = document.createElement('div');
    container.id = "chords";
    container.style = "font-size:16pt"  


    var r = new iRealRenderer;
    r.parse(song);

    container.innerHTML = `<h3>${song.title} (${song.key
        .replace(/b/g, "\u266d")
        .replace(/#/g, "\u266f")})</h3><h5>${song.composer}</h5>`;
    r.render(song, container, options, document);		
    returnupper + container.outerHTML + lower;
}


fs.writeFileSync("deck.html", cards.join(";"), 'utf-8')
