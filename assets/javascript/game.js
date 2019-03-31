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

//character grab  
var jack = $('#jack')
var davy = $('#davy')
var barb = $('#barb')
var swann = $('#swann')
//char select variable
var charSelectVar = 0
//char variables
var character = {  
    
    charD:{
        hp: 120,
        att: 6,
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
//char select
jack.click(function(){
    charSelectVar = 1
    charSelect()
})
davy.click(function(){
    charSelectVar = 2
    charSelect()
})
barb.click(function(){
    charSelectVar = 3
    charSelect()
})
swann.click(function(){
    charSelectVar = 4
    charSelect()
})

function charSelect(){
    switch (charSelectVar) {
        case 1:
            console.log("jack");
            leaveAnimate()
            break;
        case 2:
            console.log("davy");
            jack.remove();
            barb.remove();
            swann.remove();
            break;
        case 3:
            console.log("barb");
            jack.remove();
            davy.remove();
            swann.remove();
            break;
        case 4:
            console.log("swann");
            davy.remove();
            barb.remove();
            jack.remove();
            break;
    }
}
//maybe work on animate later
function leaveAnimate() {
    swann.animate({height: 'toggle'})
    davy.animate({height: 'toggle'})
    barb.animate({height: 'toggle'})
}