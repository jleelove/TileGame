
requirejs.config({
	"baseUrl":"js",
	"paths":{
		//Core Libraries
		"Class":"libs/class",
		"jquery":"libs/jquery",
		"webaudio":"libs/webaudio",
		//Classes
		"Display":"app/classes/display/Display",
		"Entity":"app/classes/entities/Entity",
		"Creature":"app/classes/entities/creatures/Creature",
		"Player":"app/classes/entities/creatures/Player",
		"Assets":"app/classes/gfx/Assets",
		"GameCamera":"app/classes/gfx/GameCamera",
		"ImageLoader":"app/classes/gfx/ImageLoader",
		"SpriteSheet":"app/classes/gfx/SpriteSheet",
		"KeyManager":"app/classes/input/KeyManager",
		"GameState":"app/classes/states/GameState",
		"MenuState":"app/classes/states/MenuState",
		"SettingsState":"app/classes/states/SettingsState",
		"State":"app/classes/states/State",
		"DirtTile":"app/classes/tiles/DirtTile",
		"GrassTile":"app/classes/tiles/GrassTile",
		"RockTile":"app/classes/tiles/RockTile",
		"Tile":"app/classes/tiles/Tile",
		"TileLoader":"app/classes/tiles/TileLoader",
		"Utils":"app/classes/utils/Utils",
		"World":"app/classes/worlds/World",
		"Game":"app/classes/Game",
		"Launcher":"app/classes/Launcher"
	}
});
// Load the main app module to start application
require(['app/main']);