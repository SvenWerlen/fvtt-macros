// Lance le sort "Image miroir" et ajoute l'effet FX "miroir" sur le jeton, basé sur le nombre d'images

const SPELLNAME = "Image miroir"

// SCRIPT
// Do NOT change unless you know what you're doing!
const tokens = canvas.tokens.controlled;
let actors = tokens.map(o => o.actor);
if (!actors.length) actors = game.actors.entities.filter(o => o.isPC && o.hasPerm(game.user, "OWNER"));
actors = actors.filter(o => o.hasPerm(game.user, "OWNER"));
if( actors.length != 1 ) { 
  ui.notifications.error("Sélectionner exactement 1 token sur la scène!") 
} else {

const actor = actors[0]

// check that spell exist in spellbook
const spells = actor.items.filter( i => i.type == "spell" && i.name == SPELLNAME );
if( spells.length == 0 ) {
  ui.notifications.error(`Le personnage ne dispose pas du sort '${SPELLNAME}'`) 
} else {

  // throw spell
  const spell = spells[0]
  spell.use({skipDialog: true}).then(s => {
    console.log(s)

    // images count
    const data = spell.getRollData()
    let images = new Roll("1d4 + floor(@cl/3)", data);
    images.roll()
    const imagesNbr = Number(images.total)
    const clby3 = Math.floor(data.cl / 3)

    // keep track of images
    actor.setFlag("pf1", "nbrImages", imagesNbr);

    ChatMessage.create({
      user: game.user._id,
      speaker: { actor: actor, alias: actor.name },
      content: `Nombre d'images: ${images.dice[0].total} + ${clby3} = ${imagesNbr}`
    });

    let params =
    [{
        filterType: "images",
        filterId: "image-miroir",
        time: 0,
        nbImage: imagesNbr + 1,
        alphaImg: 1.0,
        alphaChr: 0.0,
        blend: 4,
        ampX: 0.50,
        ampY: 0.30,
        animated :
        {
          time: 
          { 
            active: true, 
            speed: 0.0010, 
            animType: "move" 
          }
        }
    }];

    TokenMagic.addUpdateFiltersOnSelected(params);
    });
  }
}
