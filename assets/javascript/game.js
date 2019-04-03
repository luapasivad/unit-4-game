/*

-- character select --
- 3 characters, each character having different stats
    - attack, counter attack, HP (out of 100)
    - Jack Sparrow, Hector Barbosa, Elizabeth Swann, Davy Jones
        - each of these characters have different stats based on their character
        - on hover, show stats
- once character is selected, the other characters disappear, and we move to the 
  combat

-- combat --
- selected character will be moved to the botton of the screen, and 4 other characters
  will apear at the top.
- user will be prompted to select an opponent. Once they have done so, the opponent
  will move into the combat area
- enemies will appear and there will be a prompt to select opponent
    - all enemies will have different stats
- clicking attack will cause an animation, and the computer will display the damadge
  done to both the user and the computer.
- if the user ends up with 0 health, the game will end and the user will be prompted
  to restart.
- if the opponent ends up with 0 health, the game will prompt the user to pick
  a new opponent.
    - on death of an opponent, the user will recieve an incremental increase of
      attack power equal to their starting attack.
- as long as the user stays alive, the game will loop until there are no opponents left.
*/

//PUT ANIMATION INTO SEPERATE FUNCTIONS


//character grab
var jon = $('#jon')
var brienne = $('#brienne')
var daenerys = $('#daenerys')
var khal = $('#khal')
//enemy grab
var ramsey = $('#ramsey')
var cersei = $('#cersei')
var melisandre = $('#melisandre')
var nightKing = $('#nightKing')

var fightBtn = $('#fightBtn')
//char stats in obj.
var character = {  
    
    charB:{
        hp: 120,
        att: 8
    },

    charJ:{
        hp: 100,
        att: 11,
    },

    charD:{
        hp: 110,
        att: 9
    },

    charK:{
        hp: 80,
        att: 15
    }

} 
//enemy stats in obj
var enemies = {
    enemRamsey:{
        hp: 80,
        cAtt: 4 
    },
    enemCersei:{
        hp: 100,
        cAtt: 6  
    },
    enemMelisandre:{
        hp: 120,
        cAtt: 8
    },
    enemNight:{
        hp: 150,
        cAtt: 10,  
    }
}

//animation presets
function fade() {
    ramsey.fadeOut(1)
    cersei.fadeOut(1)
    melisandre.fadeOut(1)
    nightKing.fadeOut(1)
    fightBtn.fadeOut(1)
}
function charFadeOut() {
    khal.fadeOut(400)
    brienne.fadeOut(400)
    daenerys.fadeOut(400)
    jon.fadeOut(400)
}
function charFadeIn() {
    khal.delay(600).fadeIn(800)
    brienne.delay(600).fadeIn(800)
    daenerys.delay(600).fadeIn(800)
    jon.delay(600).fadeIn(800)
}
function enemyFadeOut() {
    ramsey.fadeOut(400)
    cersei.fadeOut(400)
    melisandre.fadeOut(400)
    nightKing.fadeOut(400)
}
function enemyFadeIn() {
    ramsey.delay(600).fadeIn(800)
    cersei.delay(600).fadeIn(800)
    melisandre.delay(600).fadeIn(800)
    nightKing.delay(600).fadeIn(800)
}
//user character name
var userChar = ""
//stats pertaining to character
var charStats = ""
//amount att increases by each attacl
var attackIncrementor = 0
fade()
jon.click(function(){
    userChar = "Jon Snow"
    charStats = character.charJ;
    attackIncrementor = character.charJ.att;
    selectCharAnimate()
})
brienne.click(function(){
    userChar = "Brienne of Tarth"
    charStats = character.charB;
    attackIncrementor = character.charD.att;
    selectCharAnimate()
})
daenerys.click(function(){
    userChar = "Daenerys Targaryan"
    charStats = character.charD;
    attackIncrementor = character.charB.att;
    selectCharAnimate()
})
khal.click(function(){
    userChar = "Khal Drogo"
    charStats = character.charK;
    attackIncrementor = character.charK.att;
    selectCharAnimate()
})
//wrapper where the selected character
//will go
var hero = $('#charWrapper')  
//where the characters health is
var statBar = $('#statBar')
//preset animation for enemy fadeIn
//char select animation
function selectCharAnimate() {
    console.log('boo')
    //fadeOut after selection
    charFadeOut()
    //created divs for selected character
    //and health added to stat bar
    hero.append('<div id="userChar"></div>')
    statBar.append('<div id="hpUser"></div>')
    //preset for animation followed by fadeIn
    $('#userChar').fadeOut(1)
    $('#userChar').delay(600).fadeIn(800)
    //adding name of character and
    //health
    $('#userChar').html(userChar)
    $('#hpUser').html(charStats.hp)
    //reveal enemy select
    enemyFadeIn()
}

//this is the same as the user select
var enemyChar = ""
var enemyStats = ""
var enemySelected = ""
ramsey.click(function(){
    enemChar = "Ramsey Bolton"
    enemySelected = "ramsey";
    enemyStats = enemies.enemRamsey;
    selectEnemyAnimate()
})
cersei.click(function(){
    enemChar = "Cersei Lanister"
    enemySelected = "cersei";
    enemyStats = enemies.enemCersei;
    selectEnemyAnimate()
})
melisandre.click(function(){
    enemChar = "Melisandre"
    enemySelected = "melisandre";
    enemyStats = enemies.enemMelisandre;
    selectEnemyAnimate()
})
nightKing.click(function(){
    enemChar = "The Night King"
    enemySelected = "nightKing";
    enemyStats = enemies.enemNight;
    selectEnemyAnimate()
})

//this is the same as the user
var enemy = $('#enemyWrapper')  
var enemyStatBar = $('#enemyStatBar')

function selectEnemyAnimate() {
    enemyFadeOut();
    enemy.append('<div class="opponent" id="opponent"></div>')
    enemyStatBar.append('<div id="hpEnemy"></div>')

    $('#opponent').fadeOut(1)
    $('#opponent').delay(600).fadeIn(800)

    $('#opponent').html(enemChar)
    $('#hpEnemy').html(enemyStats.hp)

    fightBtn.delay(600).fadeIn(800)
    }

//fight function
var enemiesDefeated = 0
function fight() {
    if (charStats.hp > 0 && enemyStats.hp >0) {
        //health calculation
        enemyStats.hp =  enemyStats.hp - charStats.att
        charStats.hp = charStats.hp - enemyStats.cAtt;
        charStats.att = attackIncrementor + charStats.att;
        
        
        console.log(charStats.hp)
        console.log(enemyStats.hp)
        //test update
        $('#hpEnemy').html(enemyStats.hp)
        $('#hpUser').html(charStats.hp)
        //win/lose check
        if (charStats.hp <=0) {
            console.log("YOU LOSE")
            gameOverReset()
        } else if (enemyStats.hp <=0) {
            $('#' + enemySelected).addClass('hidden')
            enemyDefeat()   
        }
    }
}

function enemyDefeat() {
    $('#opponent').fadeOut(800, function() {
        $('#opponent').remove()
    })
    fightBtn.fadeOut(800)
    $('#hpEnemy').html("")
    enemiesDefeated++
        if (enemiesDefeated == 4) {
            console.log("YOU WIN THE GAME")
            gameOverReset()
        } else if (enemiesDefeated < 4) {
            enemyFadeIn();
        }
}

function gameOverReset() {
    character = {  
        charD:{
            hp: 1,
            att: 1,
            cAtt: 10
        },
    
        charJ:{
            hp: 100,
            att: 11,
            cAtt: 6
        },

        charB:{
            hp: 110,
            att: 9,
            cAtt: 9
        },
    
        charS:{
            hp: 80,
            att: 15,
            cAtt: 3
        }
    }  
    enemies = {
        enemRamsey:{
            hp: 110,
            cAtt: 12 
        },
        enemCersei:{
            hp: 90,
            cAtt: 9  
        },
        enemMelisandre:{
            hp: 70,
            cAtt: 4
        },
        enemNight:{
            hp: 150,
            cAtt: 16,  
        }
    }
    userChar = ""
    charStats = ""
    attackIncrementor = 0
    enemyChar = ""
    enemyStats = ""
    enemiesDefeated = 0
    $('#hpEnemy').html("")
    $('#hpUser').html("")
    hero.fadeOut(1000, function() {
        hero.empty();
        hero.fadeIn(1)
    })
    enemy.fadeOut(1000, function() {
        enemy.empty();
        enemy.fadeIn(1)
    })
    fightBtn.fadeOut(1000);
    charFadeIn()
    ramsey.removeClass('hidden')
    cersei.removeClass('hidden')
    melisandre.removeClass('hidden')
    nightKing.removeClass('hidden')

}
