
tell application "Music" to playpause

set playerState to "stopped"

if application "Music" is running then
	tell application "Music"
		try
			set playerState to player state as string
		end try
	end tell
end if

return playerState