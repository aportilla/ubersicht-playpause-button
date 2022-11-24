
set playerState to "stopped"

if application "Music" is running then
	tell application "Music"
		try
			set playerState to player state
		end try
	end tell
end if

return playerState