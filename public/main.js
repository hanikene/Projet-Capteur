start();

async function start() {
  let opened = await getState();
  configButton();

  async function configButton() {
    const button = document.querySelector('button');
    button.addEventListener('click', async function() {
      if (opened) {
        button.classList.remove('on');
        button.innerText = 'off';
      } else {
        button.classList.add('on');
        button.innerText = 'on';
      }
      opened = !opened;
      await postServer(opened);
    });
  }
}

async function getState() {
  const respond = await fetch('https://projet-capteur.herokuapp.com/api/state');
  const data = await respond.json();
  return data.opened;
}

function postServer(opened) {
  fetch('https://projet-capteur.herokuapp.com/api/state', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      opened: opened
    })
  });
}
