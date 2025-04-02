console.log("Deck")

const fs = require('fs');
const Playlist = require('./src/ireal-reader-tiny');
const iRealRenderer = require('./src/ireal-renderer');
const { JSDOM } = require('jsdom');

// Ein virtuelles DOM erstellen
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

// Das virtuelle `document`-Objekt nutzen
const document = dom.window.document;



var playlist;

var options = {
    minor: "minus",
    transpose: 0,
    useH: false,
    hilite: true
};


const playlist_string = fs.readFileSync('Jazz 1410.html', 'utf8');

var playlist = new Playlist(playlist_string)




function indexOfNumber(i)
{
    const firstSongs = [
        1167,
        35,
        894,
        942,
        1210,
        1076,
        926,
        1062,
        414,
        1266,
        749,
        292,
        194,
        50,
        1216,
        13,
        300,
        225,
        607,
        776,
        475,
        79,
        1371,
        230,
        ]

    if(i < firstSongs.length)
    {
        return firstSongs[i]-1
    }
    else if (i+1 in firstSongs)
    {
        return firstSongs.indexOf(i)
    }
    return i
}


cards = []
fronts = []

for (i = 0; i < 1410; i++)
{
    j = indexOfNumber(i);
    s = playlist.songs[j];
    
    for (t = 0; t < 12; t++)
    {
        x = createCard(s, {transpose : t});

        cards.push(x.html);

        

        fronts.push(`<h3>${s.title} (${x.key
            .replace(/b/g, "\u266d")
            .replace(/#/g, "\u266f")})</h3><h5>${s.composer}</h5>`)
    }
    
    for (k = 0; k < cards.length; k++)
    {
        fronts[k] += "|" + cards[k]
    }


    fs.appendFileSync("deck.txt", fronts.join("\n") + "\n", 'utf-8')
    cards = []
    fronts = []
}

function createCard(song, transpose)
{

    upper = '<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="demo.css"><link rel="stylesheet" href="css/ireal-renderer.css">'
    lower = '</head></html>'

    const container = document.createElement('div');
    container.id = "chords";
    container.style = "font-size:16pt"  


    var r = new iRealRenderer;
    r.parse(song);
    transposed = r.transpose(song, transpose);
    r.render(song, container, options, document);		
    return {html : (upper + container.outerHTML + lower), key: transposed.key};
}




