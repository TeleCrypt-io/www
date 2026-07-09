// Minimal vim-style command/navigation layer for the TeleCrypt.io landing site.
// COMMAND mode (`:`) routes to pages; NORMAL mode keys (j/k/g/G/u) scroll/navigate.

let currentMode = 'NORMAL';
let commandBuffer = '';

document.addEventListener('keydown', (e: KeyboardEvent) => {
  switch (e.key) {
    case ':':
      e.preventDefault();
      currentMode = 'COMMAND';
      commandBuffer = ':';
      window.updateStatusBar(currentMode, commandBuffer);
      break;
    case 'Escape':
      handleEscape();
      break;
    case 'Enter':
      if (currentMode === 'COMMAND') {
        handleCommand(commandBuffer);
        handleEscape();
      }
      break;
    case 'Backspace':
      if (currentMode === 'COMMAND') {
        e.preventDefault();
        commandBuffer = commandBuffer.slice(0, -1);
        if (commandBuffer.length === 0) {
          handleEscape();
        } else {
          window.updateStatusBar(undefined, commandBuffer);
        }
      }
      break;
    default:
      if (currentMode === 'COMMAND') {
        if (e.key.length === 1) {
          e.preventDefault();
          commandBuffer += e.key;
          window.updateStatusBar(undefined, commandBuffer);
        }
      } else {
        handleNormalModeKey(e.key);
      }
  }
});

function handleEscape() {
  currentMode = 'NORMAL';
  commandBuffer = '';
  window.updateStatusBar(currentMode, '');
}

function handleCommand(command: string) {
  if (!command.startsWith(':')) return;
  const cmd = command.slice(1).toLowerCase();
  switch (cmd) {
    case 'about':
    case 'about.txt':
      window.location.href = '/about';
      break;
    case 'technology':
    case 'tech':
    case 'technology.txt':
      window.location.href = '/technology';
      break;
    case 'llms':
    case 'llms.txt':
      window.location.href = '/llms';
      break;
    case 'eject':
    case 'eject.txt':
      window.location.href = '/eject';
      break;
    case 'h':
    case 'help':
      window.location.href = '/help';
      break;
    case 'q':
    case 'q!':
      window.location.href = '/exited';
      break;
    default:
      console.log('Unknown command:', cmd);
  }
}

function handleNormalModeKey(key: string) {
  switch (key) {
    case 'u':
      navigateUp();
      break;
    case 'j':
      window.scrollBy(0, 30);
      updatePosition();
      break;
    case 'k':
      window.scrollBy(0, -30);
      updatePosition();
      break;
    case 'g':
      window.scrollTo(0, 0);
      updatePosition();
      break;
    case 'G':
      window.scrollTo(0, document.body.scrollHeight);
      updatePosition();
      break;
  }
}

function updatePosition() {
  const denom = document.documentElement.scrollHeight - window.innerHeight;
  const pct = denom > 0 ? Math.round((window.scrollY / denom) * 100) : 100;
  window.updateStatusBar(undefined, undefined, undefined, `${pct}%`);
}

function navigateUp() {
  if (window.location.pathname === '/') return;
  window.location.href = '/';
}

window.addEventListener('scroll', updatePosition);
