let invokedSpellId = 0;
    function getSpellIdFromOrbs(orbs) {
    const count = { q: 0, w: 0, r: 0 };
    orbs.forEach(o => count[o]++);

    const { q, w, r } = count;

    if (q === 3) return 1;
    if (q === 2 && w === 1) return 2;
    if (q === 2 && r === 1) return 3;
    if (w === 3) return 4;
    if (w === 2 && q === 1) return 5;
    if (w === 2 && r === 1) return 6;
    if (r === 3) return 7;
    if (r === 2 && q === 1) return 8;
    if (r === 2 && w === 1) return 9;
    if (q === 1 && w === 1 && r === 1) return 10;

    return 0; 
    }
    document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.key === "D") {
        validateSpell();
    }
    });
function validateSpell() {
  if (invokedSpellId === 0) return; 

  if (invokedSpellId === currentTargetSpell) {
    loadRandomSpell(); 
    invokedSpellId = 0; 
    document.getElementById("current-spell-orb").innerHTML = ''; 
  } else {
    alert("失败，再试一次！");
  }
}
    function startGame() {
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('targetSpell').style.display = 'block';
    loadRandomSpell();
}

function loadRandomSpell() {
  const spellId = Math.floor(Math.random() * 10) + 1;
  const spellImg = document.getElementById('targetSpellImg');
  spellImg.src = `pics/${spellId}.png`;
  spellImg.alt = `Spell ${spellId}`;
  window.currentTargetSpell = spellId;
}
    function openModal() {
      document.getElementById('myModal').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
    }

    function closeModal() {
      document.getElementById('myModal').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    }
    const orbQueue = ['', '', ''];
    const orbColors = {
      Q: '#88c0d0',
      W: '#a3be8c',
      E: '#bf616a',
      '': 'gray'
    };
    function pressOrb(key) {
    if (key === 'R') {
        updateSpellOrb();
        }
    }

    function updateDisplay() {
        for (let i = 0; i < 3; i++) {
            const orb = document.getElementById(`orb${i}`);
            const orbType = orbQueue[i];
            orb.style.backgroundColor = orbColors[orbType];

            if (orbType === '') {
            orb.innerHTML = ''; 
            } else {
            orb.innerHTML = `<img src="pics/${orbType.toLowerCase()}.png" alt="${orbType}" style="width: 100%; height: 100%; object-fit: contain;">`;
            }
        }
}

    function addOrb(orbType) {
      orbQueue.shift();
      orbQueue.push(orbType);
      updateDisplay();
    }

    function getSpellImageFromOrbs(queue) {
        const counts = { Q: 0, W: 0, E: 0 };
        for (const orb of queue) {
            if (orb in counts) counts[orb]++;
        }
        const key = `${counts.Q}q${counts.W}w${counts.E}e`;

        const spellMap = {
            '3q0w0e': '1',
            '2q1w0e': '2',
            '2q0w1e': '3',
            '0q3w0e': '4',
            '1q2w0e': '5',
            '0q2w1e': '6',
            '0q0w3e': '7',
            '1q0w2e': '8',
            '0q1w2e': '9',
            '1q1w1e': '10'
        };

        const spellId = spellMap[key];
        return spellId ? `pics/${spellId}.png` : null;
}

function updateSpellOrb() {
  const spellOrbDiv = document.getElementById('current-spell-orb');
  const imgName = getSpellImageFromOrbs(orbQueue);

  if (imgName) {
    spellOrbDiv.innerHTML = `<img src="${imgName}" alt="Spell">`;
    const match = imgName.match(/(\d+)\.png/);
    if (match) {
      invokedSpellId = parseInt(match[1]);
    } else {
      invokedSpellId = 0;
    }

  } else {
    spellOrbDiv.innerHTML = '';
    invokedSpellId = 0;
  }
}
document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (['Q', 'W', 'E'].includes(key)) {
    addOrb(key);
  } else if (key === 'R') {
    pressOrb('R');
  }

  const btn = document.querySelector(`.orb-btn.${key.toLowerCase()}`);
  if (btn) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 100);
  }
});
    updateDisplay();
