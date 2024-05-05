# odin-tic-tac-toe
Tic Tac Toe | The Odin Project (online course)

Lessons learned

Tricks
- You can reset a parent div text content to nothing in order to reset all children to nothing: 

    boardDiv.textContent = "";

    This is cleaner than the approach I was using where I remade every new cell/ button with blank content, because the event listener doesn't need to be updated with a new game, only the text content.
