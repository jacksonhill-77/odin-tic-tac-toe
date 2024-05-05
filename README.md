# odin-tic-tac-toe
Tic Tac Toe | The Odin Project (online course)

Lessons learned

- You can reset a parent div text content to nothing in order to reset all children to nothing: 

    boardDiv.textContent = "";

    This is cleaner than the approach I was using where I remade every new cell/ button with blank content, because the event listener doesn't need to be updated with a new game, only the text content.

- Why does the Cell function use a "cell1.getSymbol()" function rather than changing it through dot notation, e.g. cell1.symbol = "X";?
    -> Using this function encapsulates the state, preventing code which is not explicitly using a method on it from changing it accidentally
    -> It is an example of a 'closure variable', meaning that it is defined in a function B within the factory function A which is returned as part of the object at the end of the factory function

- A good structure for games is to only keep the logic in a GamePlayer object, and then refresh the entire screen each time a round is played. This is better than trying to handle clicks by updating the DOM text content and the GamePlayer object separately, which is what I tried to do at first. I was trying to avoid re-rendering the entire board each time a click is made, but I understand now that this is not a bad outcome and makes the code a lot cleaner.

- Rather than looping over a 2D array with 2x for loops, you can loop over with 2x forEach loops using the second forEach loop nested within an arrow function in the first forEach loop's argument

- Given a board of cells, event listeners can be added to the board div rather than each individual cell. This technique is called event delegation, where the bubbling property of event listeners allow clicks at a higher level in the DOM to be listened to by lower elements. If the outer element's event is intended to be handled first, we can use the parameter "useCapture" in addEventListener.
