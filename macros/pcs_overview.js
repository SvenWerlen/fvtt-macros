// CONFIGURATION
// - skills: list of skills
// - display: list of elements to display
// 

const SKILLS = [ "Acr", "Spl", "Blf", "KDu", "KLo", "KGe", "KHi", "KEn", "KAr", "KNa", "KNo", "KPl", "KRe", "Dis", "Dip", "Ste", "Han", "Rid", "Clm", "Slt", "Apr", "Esc", "Int", "Lin", "Swm", "Per", "Hea", "Sen", "Dev", "Sur", "UMD", "Fly" ]

SKILLS.sort(function(a,b) { return game.i18n.localize("PF1.Skill" + a).localeCompare(game.i18n.localize("PF1.Skill" + b));  })

const DISPLAY = [
  { label: '', path: 'name', th: true },
  { label: "XP", path: 'data.data.details.xp.value' },
  
  { label: game.i18n.localize("PF1.Attributes"), path: '', th: true },
  { label: 'For', path: ['data.data.abilities.str.total', 'data.data.abilities.str.mod'] },
  { label: 'Dex', path: ['data.data.abilities.dex.total', 'data.data.abilities.dex.mod'] },
  { label: 'Con', path: ['data.data.abilities.con.total', 'data.data.abilities.con.mod'] },
  { label: 'Int', path: ['data.data.abilities.int.total', 'data.data.abilities.int.mod'] },
  { label: 'Sag', path: ['data.data.abilities.wis.total', 'data.data.abilities.wis.mod'] },
  { label: 'Cha', path: ['data.data.abilities.cha.total', 'data.data.abilities.cha.mod'] },

  { label: game.i18n.localize("PF1.ItemTypeAttack"), path: '', th: true },
  { label: game.i18n.localize("PF1.Initiative"), path: 'data.data.attributes.init.total' },
  { label: game.i18n.localize("PF1.CMBAbbr"), path: 'data.data.attributes.cmb.total' },

  { label: game.i18n.localize("PF1.Defenses"), path: '', th: true },
  { label: game.i18n.localize("PF1.HPShort"), path: ['data.data.attributes.hp.value', 'data.data.attributes.hp.max'] },
  { label: game.i18n.localize("PF1.ACNormal"), path: ['data.data.attributes.ac.normal.total', 'data.data.attributes.ac.touch.total', 'data.data.attributes.ac.flatFooted.total'] },
  { label: game.i18n.localize("PF1.SavingThrowRef"), path: 'data.data.attributes.savingThrows.ref.total' },
  { label: game.i18n.localize("PF1.SavingThrowFort"), path: 'data.data.attributes.savingThrows.fort.total' },
  { label: game.i18n.localize("PF1.SavingThrowWill"), path: 'data.data.attributes.savingThrows.will.total' },
  { label: game.i18n.localize("PF1.CMDAbbr"), path: 'data.data.attributes.cmd.total' },

  { label: game.i18n.localize("PF1.Skills"), path: '', th: true },
]

SKILLS.forEach( s => DISPLAY.push( { label: game.i18n.localize("PF1.Skill" + s), path: [`data.data.skills.${s.toLowerCase()}.rank`, `data.data.skills.${s.toLowerCase()}.mod`] } ));

// SCRIPT
// Do NOT change unless you know what you're doing!

let actorIds = []
game.users.forEach( function(u) { if( !u.isGM ) { actorIds.push(u.character.id) } } )
const actors = game.actors.filter( a => actorIds.indexOf( a.id ) >= 0 )
console.log(actors)

let template = "<table id=\"stats\">"

// characters names
DISPLAY.forEach( d => {
  const tag = d.th ? 'th' : 'td'
  template += `<tr><${tag} class="label">${d.label}</${tag}>`
  actors.forEach( a => { 
    if( Array.isArray( d.path ) ) {
      let value = ""
      d.path.forEach( p => {
        value += " / " + (hasProperty(a, p) ? getProperty(a, p) : "")
      });
      template += `<${tag}>${value.substring(3)}</${tag}>` 
    }
    else {
      const value = hasProperty(a, d.path) ? getProperty(a, d.path) : ""
      template += `<${tag}>${value}</${tag}>` 
    }
  });
  template += "</tr>"
});
template += "</table>"
template += `<style>
  #stats th, #stats td { width: 150px }
  #stats td { text-align: center}
  #stats td.label, #stats th.label { width: 350px; text-align: left; padding-left: 15px }
  #stats th.label { padding-top: 15px; padding-left: 10px }
  #stats tr:nth-child(even) { background-color: rgba(170, 170, 170, 0.3) }
  #stats tr:hover { background-color: #333; color: #fff }
</style>`

let buttons = {};

new Dialog({
    title: 'Statistiques',
    content: template,
    buttons: buttons,
  }, { width: 1000 }).render(true);


