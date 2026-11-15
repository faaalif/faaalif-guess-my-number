# Guess My Number

Three bots race to find the same secret number. You can watch them compete, play against them, or let the bot guess yours.

| Bot | Strategy | Complexity |
|---|---|---|
| Linear | Tries 1, 2, 3, until it finds it | O(n) |
| Random | Fires off any number, may repeat | O(n) expected |
| Binary | Asks about the middle and discards the other half | O(log n) |

With 1,000,000 possible numbers, the binary bot needs at most 20 guesses. With a billion, only 30.

## Modes

1. **Race:** the three bots look for the same number and you see how many guesses each one needs. Includes a log-scale chart and a table of averages by size.
2. **You guess:** the computer picks a number and you try to find it. At the end, you see how the binary bot would have done.
3. **Bot guesses:** you think of a number and the bot finds it with binary search.

The page is available in Spanish and English (ES / EN button, top right).

## Structure

```
guess-my-number/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js      <- the three bots live here
└── README.md
```

## Run it

No install needed. Open `index.html` in your browser.

## Live version

https://faaalif.github.io/guess-my-number/
