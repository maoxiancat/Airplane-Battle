var heroPosition = {};
var bulletPosition = {};
var enemyPositions = [];
var step1 = 3;
var step2 = 1;
var intervalId1 = null;
var intervalId2 = null;
var lives;
var enemySpawnInterval = 3000;
var timeSinceLastSpawn = 0;
var warheadtype = "normal"
var fuselagetype = "normal"
var hardscore = 5

var g2div3 = document.getElementById("g2div3")
var g2div4 = document.getElementById("g2div4")
var warhead1 = document.getElementById("warhead1")
var warhead2 = document.getElementById("warhead2")
var fuselage1 = document.getElementById("fuselage1")
var fuselage2 = document.getElementById("fuselage2")
var fuselage3 = document.getElementById("fuselage3")
var hardscore1 = document.getElementById("hardscore1")
var hardscore2 = document.getElementById("hardscore2")
var hardscore3 = document.getElementById("hardscore3")
var hardscore4 = document.getElementById("hardscore4")
var hardscore5 = document.getElementById("hardscore5")
var hardscore6 = document.getElementById("hardscore6")
var hardscore7 = document.getElementById("hardscore7")
var hardscore8 = document.getElementById("hardscore8")
var hardscore9 = document.getElementById("hardscore9")


function startGame() {
    stopBullet();
    stopEnemy();
    startEnemy();
    if (warheadtype == "normal") {
        startBullet();
    }
    if (warheadtype == "through") {
        startBullet2()
    }
    g2div4.classList.remove("disappear")
    heroPosition = { top: 80.5, left: 44 };
    bulletPosition = { top: 79.7, left: 48.4 };
    enemyPositions = [];
    if (fuselagetype == "quickly") {
        lives = 3
    } else if (fuselagetype == "normal") {
        lives = 5
    } else if (fuselagetype == "firm") {
        lives = 7
    }
    document.getElementById('lives').textContent = lives;

    enemySpawnInterval = 3000;

    const enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function(enemy) {
        enemy.remove();
    });
    addEnemy();
}

function updatePosition(elementId, position) {
    const element = document.getElementById(elementId);
    element.style.top = `${position.top}%`;
    element.style.left = `${position.left}%`;
}

document.addEventListener('keydown', controlHero);
function controlHero(event) {
    switch (event.key) {
        case 'w':
            console.log(fuselagetype)
            if (heroPosition.top > 0.5) {
                if (fuselagetype == "quickly") {
                    if (heroPosition.top == 2.5) {
                        heroPosition.top -= 2.5
                    } else {
                        heroPosition.top -= step1;
                    }
                    if (heroPosition.top == 2.5) {
                        heroPosition.top -= 2.5
                    } else {
                        heroPosition.top -= step1;
                    }
                } else if (fuselagetype == "normal") {
                    if (heroPosition.top == 2.5) {
                        heroPosition.top -= 2.5
                    } else {
                        heroPosition.top -= step1;
                    }
                } else if (fuselagetype == "firm") {
                    if (heroPosition.top == 2.5) {
                        heroPosition.top -= 2.5
                    } else {
                        heroPosition.top -= 1;
                    }
                }
            }
            break;
        case 's':
            if (heroPosition.top < 96) {
                if (fuselagetype == "quickly") {
                    if (heroPosition.top == 95.5) {
                        heroPosition.top += 0.5
                    } else {
                        heroPosition.top += step1;
                    }
                    if (heroPosition.top == 95.5) {
                        heroPosition.top += 0.5
                    } else {
                        heroPosition.top += step1;
                    }
                } else if (fuselagetype == "normal") {
                    if (heroPosition.top == 95.5) {
                        heroPosition.top += 0.5
                    } else {
                        heroPosition.top += step1;
                    }
                } else if (fuselagetype == "firm") {
                    if (heroPosition.top == 95.5) {
                        heroPosition.top += 0.5
                    } else {
                        heroPosition.top += 1;
                    }
                }
            }
            break;
        case 'a':
            if (heroPosition.left > 0) {
                if (fuselagetype == "quickly") {
                    if (heroPosition.left == 2) {
                        heroPosition.left -= 2;
                    } else {
                        heroPosition.left -= step1;
                    }
                    if (heroPosition.left == 2) {
                        heroPosition.left -= 2;
                    } else {
                        heroPosition.left -= step1;
                    }
                } else if (fuselagetype == "normal") {
                    if (heroPosition.left == 2) {
                        heroPosition.left -= 2;
                    } else {
                        heroPosition.left -= step1;
                    }
                } else if (fuselagetype == "firm") {
                    if (heroPosition.left == 2) {
                        heroPosition.left -= 2;
                    } else {
                        heroPosition.left -= 1;
                    }
                }
            }
            break;
        case 'd':
            if (heroPosition.left < 90) {
                if (fuselagetype == "quickly") {
                    if (heroPosition.left == 89) {
                        heroPosition.left += 1;
                    } else {
                        heroPosition.left += step1;
                    }
                    if (heroPosition.left == 89) {
                        heroPosition.left += 1;
                    } else {
                        heroPosition.left += step1;
                    }
                } else if (fuselagetype == "normal") {
                    if (heroPosition.left == 89) {
                        heroPosition.left += 1;
                    } else {
                        heroPosition.left += step1;
                    }
                } else if (fuselagetype == "firm") {
                    if (heroPosition.left == 89) {
                        heroPosition.left += 1;
                    } else {
                        heroPosition.left += 1;
                    }
                }
            }
            break;
    }
    updatePosition('g2div3', heroPosition);
}

function controlBullet() {
    bulletPosition.top -= step2;
    if (bulletPosition.top < 0) {
        bulletPosition.top = heroPosition.top - 0.8;
        bulletPosition.left = heroPosition.left + 4.4;
    }
    updatePosition('g2div4', bulletPosition);

    enemyPositions.forEach(function(enemy, index) {
        if (bulletPosition.top <= enemy.top &&
            bulletPosition.top >= enemy.top - 3 &&
            bulletPosition.left >= enemy.left - 1 &&
            bulletPosition.left <= enemy.left + 7) {
            
            enemy.top = 0;
            enemy.left = Math.floor(Math.random() * 90);
            if (warheadtype == "normal") {
                bulletPosition.top = heroPosition.top - 0.8;
                bulletPosition.left = heroPosition.left + 4.4;
                updatePosition('g2div4', bulletPosition);
            }
            const enemyElement = document.querySelector(`.enemy[data-index="${index}"]`);
            if (enemyElement) {
                enemyElement.style.top = `${enemy.top}%`;
                enemyElement.style.left = `${enemy.left}%`;
            }
        }
    });
}

function controlEnemy() {
    enemyPositions.forEach((enemy, index) => {
        enemy.top += 0.7;
        const enemyElement = document.querySelector(`.enemy[data-index="${index}"]`);
        if (enemyElement) {
            enemyElement.style.top = `${enemy.top}%`;
        }
        if (enemy.top == 96) {
            enemy.left = Math.floor(Math.random() * 90) + 1;
            enemy.top = 0;
            const enemyElement = document.querySelector(`.enemy[data-index="${index}"]`);
            if (enemyElement) {
                enemyElement.style.top = `${enemy.top}%`;
                enemyElement.style.left = `${enemy.left}%`;
            }
            lives--;
            document.getElementById('lives').textContent = lives;
            if (lives <= 0) {
                alert("游戏结束！");
                g2div4.classList.add("disappear")
                stopBullet();
                stopEnemy();
            }
        }
    });

    timeSinceLastSpawn += 5 * hardscore;
    if (timeSinceLastSpawn >= enemySpawnInterval) {
        if (enemyPositions.length < hardscore) {
            addEnemy();
        }
        timeSinceLastSpawn = 0;
    }

    if (fuselagetype == "firm") {
        enemyPositions.forEach(function(enemy, index) {
            if (heroPosition.top <= enemy.top + 2 &&
                heroPosition.top >= enemy.top - 7 &&
                heroPosition.left >= enemy.left - 11 &&
                heroPosition.left <= enemy.left + 7) {
                
                enemy.top = 0;
                enemy.left = Math.floor(Math.random() * 90);
                const enemyElement = document.querySelector(`.enemy[data-index="${index}"]`);
                if (enemyElement) {
                    enemyElement.style.top = `${enemy.top}%`;
                    enemyElement.style.left = `${enemy.left}%`;
                }
            }
        });
    }
}

function addEnemy() {
    const newEnemy = { top: 0, left: Math.floor(Math.random() * 90) + 1 };
    enemyPositions.push(newEnemy);
    const enemyElement = document.createElement('div');
    enemyElement.className = 'enemy';
    enemyElement.setAttribute('data-index', enemyPositions.length - 1);
    enemyElement.style.top = `${newEnemy.top}%`;
    enemyElement.style.left = `${newEnemy.left}%`;
    document.getElementById('g2div2').appendChild(enemyElement);
}

function startBullet() {
    intervalId1 = setInterval(controlBullet, 10);
}
function startBullet2() {
    intervalId1 = setInterval(controlBullet, 5);
}
function stopBullet() {
    if (intervalId1) {
        clearInterval(intervalId1);
        intervalId1 = null;
    }
}
function startEnemy() {
    intervalId2 = setInterval(controlEnemy, 100);
}
function stopEnemy() {
    if (intervalId2) {
        clearInterval(intervalId2);
        intervalId2 = null;
    }
}

function choicewarhead1() {
    warhead1.style.border = "3px solid green"
    warhead2.style.border = "1px solid black"
    warheadtype = "normal"
}
function choicewarhead2() {
    warhead1.style.border = "1px solid black"
    warhead2.style.border = "3px solid green"
    warheadtype = "through"
}
function choicefuselage1() {
    fuselage1.style.border = "3px solid green"
    fuselage2.style.border = "1px solid black"
    fuselage3.style.border = "1px solid black"
    fuselagetype = "normal"
    g2div3.style.border = "1.5px solid black"
}
function choicefuselage2() {
    fuselage1.style.border = "1px solid black"
    fuselage2.style.border = "3px solid green"
    fuselage3.style.border = "1px solid black"
    fuselagetype = "quickly"
    g2div3.style.border = "1px solid black"
}
function choicefuselage3() {
    fuselage1.style.border = "1px solid black"
    fuselage2.style.border = "1px solid black"
    fuselage3.style.border = "3px solid green"
    fuselagetype = "firm"
    g2div3.style.border = "3px solid black"
}

function choicehardscore1() {
    hardscore1.style.border = "3px solid green"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 1
}
function choicehardscore2() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "3px solid green"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 2
}
function choicehardscore3() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "3px solid green"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 3
}
function choicehardscore4() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "3px solid green"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 4
}
function choicehardscore5() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "3px solid green"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 5
}
function choicehardscore6() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "3px solid green"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 6
}
function choicehardscore7() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "3px solid green"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "1px solid black"
    hardscore = 7
}
function choicehardscore8() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "3px solid green"
    hardscore9.style.border = "1px solid black"
    hardscore = 8
}
function choicehardscore9() {
    hardscore1.style.border = "1px solid black"
    hardscore2.style.border = "1px solid black"
    hardscore3.style.border = "1px solid black"
    hardscore4.style.border = "1px solid black"
    hardscore5.style.border = "1px solid black"
    hardscore6.style.border = "1px solid black"
    hardscore7.style.border = "1px solid black"
    hardscore8.style.border = "1px solid black"
    hardscore9.style.border = "3px solid green"
    hardscore = 9
}