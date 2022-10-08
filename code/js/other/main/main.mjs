const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1152;
canvas.height = 640;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const body = document.querySelector('body');

// buttons
let eco_Button = document.getElementById('eco');
let self_Button = document.getElementById('self');
let shoot_Button = document.getElementById('shoot');
let back_Menu = document.getElementById('back_Menu');
let back_MS = document.getElementById('back_Menu_Settings');
let playpause = document.getElementById('pause_unpause');
let tuto = document.getElementById('tuto');
let retry = document.getElementById('retry');
// menu buttons
let main_Menu = document.getElementById('main');
let game_Menu = document.getElementById('game');
let settings_Menu = document.getElementById('main_settings');
let lose_Menu = document.getElementById('lose');

// sfx
let charge = new Audio('code/css/charge.mp3');
let shoot = new Audio('code/css/shoot.mp3');

let cursor = document.getElementById('cursor');
export {
	canvas,
	ctx,
	WIDTH,
	HEIGHT,
	eco_Button,
	self_Button,
	game_Menu,
	main_Menu,
	back_Menu,
	playpause,
	settings_Menu,
	back_MS,
	tuto,
	body,
	shoot_Button,
	retry,
	lose_Menu,
	cursor,
	charge,
	shoot
};
