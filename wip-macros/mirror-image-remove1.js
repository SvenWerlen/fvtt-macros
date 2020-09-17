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
let images = Number(actor.getFlag("pf1", "nbrImages"))
if(images <= 1) {
  TokenMagic.deleteFiltersOnSelected();
} else {

  images -= 1

  // keep track of images
  actor.setFlag("pf1", "nbrImages", images);

  let params =
  [{
      filterType: "images",
      filterId: "image-miroir",
      time: 0,
      nbImage: images + 1,
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
  }
}
