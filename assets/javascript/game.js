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

$(document).ready(function() {
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
    //btn
    var fightBtn = $('#fightBtn')
    //variables for selecred character
    var userChar = ""
    var charStats = ""
    var attackIncrementor = 0
    //selected char div
    var hero = $('#charWrapper') 
    var heroPic = ""
    //health bar 
    var statBar = $('#statBar')
    //variable for enemy character
    var enemyChar = ""
    var enemyStats = ""
    //selected enemy div
    var enemy = $('#enemyWrapper')
    //enemy health bar  
    var enemyStatBar = $('#enemyStatBar')
    //used to create selected enemy
    var enemySelected = ""
    //game win determinent
    var enemiesDefeated = 0
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

    var healthLost = 
    //animation
    animation = {
        //preset animation
        fade: function() {
            ramsey.fadeOut(1)
            cersei.fadeOut(1)
            melisandre.fadeOut(1)
            nightKing.fadeOut(1)
            fightBtn.fadeOut(1)
            $('#throne').fadeOut(1)
        },
        charFadeOut: function() {
            khal.fadeOut(400)
            brienne.fadeOut(400)
            daenerys.fadeOut(400)
            jon.fadeOut(400)
        },
        charFadeIn: function() {
            khal.delay(600).fadeIn(800)
            brienne.delay(600).fadeIn(800)
            daenerys.delay(600).fadeIn(800)
            jon.delay(600).fadeIn(800)
        },
        enemyFadeOut: function() {
            ramsey.fadeOut(400)
            cersei.fadeOut(400)
            melisandre.fadeOut(400)
            nightKing.fadeOut(400)
        },
        enemyFadeIn: function() {
            ramsey.delay(600).fadeIn(800)
            cersei.delay(600).fadeIn(800)
            melisandre.delay(600).fadeIn(800)
            nightKing.delay(600).fadeIn(800)
        },
        attack: function() {
            $('#userChar').addClass('attackAnimate').queue()
            $('#userChar').delay(250).queue(function flash() {
                $('#slash1').addClass('slashAnimate')
                $('#slash1').delay(200).queue(function() {
                    $('#slash1').removeClass('slashAnimate').dequeue();})  
            $('#userChar').removeClass('attackAnimate').dequeue();
            $("#enemyWrapperFight").prepend('<div id="damadge">hi</div>')

            })
        }
        
    }

    animation.fade()
    jon.click(function(){
        userChar = "<img src='assets/images/jon.jpg'>"
        charStats = character.charJ;
        attackIncrementor = character.charJ.att;
        selectCharacter()
    })
    brienne.click(function(){
        userChar = "<img src='assets/images/brienne.jpg'>"
        charStats = character.charB;
        attackIncrementor = character.charD.att;
        selectCharacter()
    })
    daenerys.click(function(){
        userChar = "<img src='assets/images/danaerys.jpg'>"
        charStats = character.charD;
        attackIncrementor = character.charB.att;
        selectCharacter()
    })
    khal.click(function(){
        userChar = "<img src='assets/images/khal.jpg'>"
        charStats = character.charK;
        attackIncrementor = character.charK.att;
        selectCharacter()
    })

    function selectCharacter() {
        console.log('boo')
        //fadeOut after selection
        animation.charFadeOut()
        //created divs for selected character
        //and health added to stat bar
        hero.append('<div id="userChar"></div>')
        $('#userHealthWrapper').append('<div id="hpUser"></div>')
        //preset for animation followed by fadeIn
        $('#userChar').fadeOut(1)
        $('#userChar').delay(600).fadeIn(800)
        //adding name of character and
        //health
        $('#userChar').html(userChar)
        $('#hpUser').html(charStats.hp)
        $('#userHealthWrapper').removeClass('hidden')
        //reveal enemy select
        animation.enemyFadeIn()
    }

    //this is the same as the user select
    ramsey.click(function(){
        enemChar = "<img src='assets/images/ramsay.jpg'>"
        enemySelected = "ramsey";
        enemyStats = enemies.enemRamsey;
        selectEnemy()
    })
    cersei.click(function(){
        enemChar = "<img src='assets/images/cersei.jpg'>"
        enemySelected = "cersei";
        enemyStats = enemies.enemCersei;
        selectEnemy()
    })
    melisandre.click(function(){
        enemChar = "<img src='assets/images/mel.jpg'>"
        enemySelected = "melisandre";
        enemyStats = enemies.enemMelisandre;
        selectEnemy()
    })
    nightKing.click(function(){
        enemChar = "<img src='assets/images/night.jpg'>"
        enemySelected = "nightKing";
        enemyStats = enemies.enemNight;
        selectEnemy()
    })

    function selectEnemy() {
        animation.enemyFadeOut();
        enemy.append('<div class="opponent" id="opponent"></div>')
        $('#enemyHealthWrapper').append('<div id="hpEnemy"></div>')

        $('#opponent').fadeOut(1)
        $('#opponent').delay(600).fadeIn(800)

        $('#opponent').html(enemChar)
        $('#hpEnemy').html(enemyStats.hp)
        $('#enemyHealthWrapper').removeClass('hidden')

        fightBtn.delay(600).fadeIn(800)
        }

    //fight function
    gameLogic = {
        fight: function() {
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
                    gameLogic.gameOverReset()
                } else if (enemyStats.hp <=0) {
                    $('#' + enemySelected).addClass('hidden')
                    gameLogic.enemyDefeat()   
                }
            }
        },

        enemyDefeat: function() {
            $('#enemyHealthWrapper').addClass('hidden')
            $('#opponent').fadeOut(800, function() {
                $('#opponent').remove()
            })
            fightBtn.fadeOut(800)
            $('#hpEnemy').html("")
            enemiesDefeated++
                if (enemiesDefeated == 4) {
                    $('#char-container').append('<div id="winText" class="winText">YOU CONQUERED THE THRONE<br>PRESS ANY KEY TO REPLAY</div>')
                    $('#throne').fadeIn()
                    $('#userChar').addClass('userThrone')
                    $(document).keypress(function() {gameLogic.gameOverReset()})
                    console.log("YOU WIN THE GAME")
                } else if (enemiesDefeated < 4) {
                    animation.enemyFadeIn();
                }
        },

        gameOverReset: function() {
            character = {  
        
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
                $('#opponent').remove();
                enemy.fadeIn(1)
            })
            fightBtn.fadeOut(1000);
            $('#winText').remove()
            animation.charFadeIn()
            $('#throne').fadeOut()
            ramsey.removeClass('hidden')
            cersei.removeClass('hidden')
            melisandre.removeClass('hidden')
            nightKing.removeClass('hidden')
            $('#userHealthWrapper').addClass('hidden')

        }
    }
})