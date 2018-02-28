//Array of Character Objects
var charArr = [
    {
        name: "Yusuke",
        str: 10,
        hp: 75,
        image: "assets/images/Yusuke.png"
    },
    {
        name: "Kuwabara",
        str: 5,
        hp: 150,
        image: "assets/images/Kuwabara.png"
    },
    {
        name: "Kurama",
        str: 8,
        hp: 100,
        image: "assets/images/Kurama.png"
    },
    {
        name: "Hiei",
        str: 15,
        hp: 50,
        image: "assets/images/Hiei.png"
    },
    {
        name: "Bayonetta",
        str: 25,
        hp: 250,
        image: "assets/images/bayonetta.jpg"
    },
    {
        name: "Kenshin",
        str: 40,
        hp: 300,
        image: "assets/images/kenshin.jpg"
    }
]
//Chosen Hero Object 
var chosenHero
//(is hero chosen bool)
var isHeroChosen
//(is hero alive bool )
var isHeroAlive
//Chosen Enemy Object
var EnemyHero
//(is enemy chosen bool)
var isEnemyChosen
//(is enemy alive bool )
var isEnemyAlive

var NbrEnemy = 5
//Initiate Game Function
function initGame() {
    $('.attackBTN').hide()
    $('.resetBTN').hide()
    var audio = $("#bg-audio").get(0).play()
    isHeroChosen = false
    isEnemyChosen = false
    var num = Math.floor(12 / charArr.length) //Give rounded down number 
    for (var i = 0; i < charArr.length; i++) {
        var charThing = $("<div id='character-" + i + "'class = 'char col-md-" + num + "'value='" + i + "'></div>")
        charThing.html(
            "<div class='charImg img-thumbnail'> <img src='" + charArr[i].image + " 'style='width:100%; height:250px;'/><div class='charDesc'><h3 id='Name'>" + charArr[i].name + "</h3><h5 id='Health'> HP: " + charArr[i].hp + "</h5><h5 id='Strength'> Strength: " + charArr[i].str + "</h5></div></div>"
        )
        $(".characters").append(charThing)
        $("#character-4").addClass("fader")
        $("#character-4").addClass("avoid-clicks")
        $("#character-5").addClass("fader")
        $("#character-5").addClass("avoid-clicks")
    }
}

$(document).on("click", ".char", function () {
    $('.BattleImage').show()
    if (!isHeroChosen) {
        chosenHero = charArr[$(this).attr("value")]
        console.log(chosenHero)
        $(this).fadeOut('fast')
        $("#BattleHero").append("<div class='HeroImg img-thumbnail'> <img src='" + chosenHero.image + " 'style='width:100%; height:350px;'/><div class='charDesc'><h3 id='Name'>" + chosenHero.name + "</h3><h5 id='HeroHealth'> HP: " + chosenHero.hp + "</h5><h5 id='HeroStrength'> Strength: " + chosenHero.str + "</h5></div></div>")
        isHeroChosen = true
        // console.log(this)
    }
    else if (!isEnemyChosen) {
        EnemyHero = charArr[$(this).attr("value")]
        console.log(EnemyHero)
        $("#BattleEnemy").append("<div class='EnemyImg img-thumbnail'> <img src='" + EnemyHero.image + " 'style='width:100%; height:350px;'/><div class='charDesc'><h3 id='Name'>" + EnemyHero.name + "</h3><h5 id='EnemyHealth'> HP: " + EnemyHero.hp + "</h5><h5 id='EnemyStrength'> Strength: " + EnemyHero.str + "</h5></div></div>")
        isEnemyChosen = true
        $(this).fadeOut('fast')
        $('.attackBTN').show()
        $('.resetBTN').show()
        $('#header').html("Fight!")
        $(document).scrollTop(2000)
        // $('.startBTN').show()
        // console.log(this)
    }
})

//Attack Function
$(document).on("click", ".attackBTN", function () {
    chosenHero.hp -= EnemyHero.str
    EnemyHero.hp -= chosenHero.str
    $("#HeroHealth").text("HP: " + chosenHero.hp)
    $("#EnemyHealth").text("HP: " + EnemyHero.hp)

    if (EnemyHero.hp <= 0) {
        $("#deathcry").get(0).play()
        $("#BattleEnemy").empty()
        chosenHero.hp = chosenHero.hp + Math.floor(Math.random() * 175)
        chosenHero.str = chosenHero.str + Math.floor(Math.random() * 25)
        $("#HeroHealth").text("HP: " + chosenHero.hp)
        $("#HeroStrength").text("Strength: " + chosenHero.str)
        isEnemyChosen = false
        NbrEnemy--
        console.log(NbrEnemy)
        alert(EnemyHero.name + " has been defeated. Select your next opponent!")
        $(document).scrollTop(125)
        if (NbrEnemy === 2) {
            alert("Bosses have been unlocked. Good luck!")
            $("#character-4").removeClass("fader")
            $("#character-5").removeClass("fader")
            $("#character-4").removeClass("avoid-clicks")
            $("#character-5").removeClass("avoid-clicks")
        }
        // if (NbrEnemy === 1 && isEnemyChosen === true){
        //     $(document).scrolltop(0)
        // }
    }
    else if (chosenHero.hp < 1) {
        alert("You Lose")
    }
    else if (NbrEnemy ===0) {
        alert("You win")
    }
})
// Reset Game Function   
$(document).on("click", ".resetBTN", function (event) {
    event.preventDefault()
    $("#BattleHero").hide()
    $("#BattleEnemy").hide()
    $('.characters').hide()
    initGame()
    // $('.attackBTN').hide()
    // $('.resetBTN').hide()

})

initGame()