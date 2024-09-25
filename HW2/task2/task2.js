[window.alert, window.prompt, window.confirm] = [window.confirm, window.alert, window.prompt];
window.alert('window.alert() is calling confirm()');
window.prompt('window.prompt() is calling alert');
window.confirm('window.confirm() is calling prompt');