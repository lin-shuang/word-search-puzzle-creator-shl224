# CSE 264 Homework 2 - Word Search Puzzle Creator

- Author: Shuang Lin
- Email: shuanglin3359@gmail.com

## Purpose

The purpose of this assignment is to get your feet wet programming in server side Javascript (node.js) without getting much into the node api.

## Overview

The task is to write a one file program, puzzle.js, that, when run from the command line using the node interpreter, will create a word search puzzle of a given size (10 x 10 in this case) using the words provided (one per line) in a text file (colors.txt in this case). Example:

node puzzle.js 10 colors.txt 

will create output similar to this:

    RED
    ORANGE
    YELLOW
    GREEN
    BLUE
    INDIGO
    VIOLET

    * G * * * * * O * *
    * R * * * B R * * *
    * E * * * A L * * *
    V E * * N * * U * *
    I N O G * * * * E *
    O D E G Y E L L O W
    L E * * I * * * * *
    E R * * * D * * * *
    T * * * * * N * * *
    * * * * * * * I * *

    G G C X D D Y O D G
    W R B Y D B R L J G
    H E Q U A A L V D M
    V E C A N B W U S Q
    I N O G Q R T F E B
    O D E G Y E L L O W
    L E D Z I Z E L W X
    E R X Q M D T L P B
    T T I D Y Y N P D G
    C S H F Y Q N I P C

The first part of the output is the list of words (converted to upper case) in the file colors.txt (one word per line). The next part is the answer key with the words inserted into the puzzle. The last part is the finished puzzle with random letters replacing the *.

## Specifications

1. All words must be converted to uppercase. 
2. Each word must be placed at a random starting point (row,col) and in one of 8 possible directions, randomly selected. The possible directions are:

    5 6 7
    4 * 0
    3 2 1
3. One word can intersect another only if the intersection point is a letter common to both words.
4. For each word, first pick a starting row/column and then randomly try each of the 8 directions until one is found that allows the word to be placed without running off the edge of the grid or conflicting with another word. If all 8 directions fail, then randomly pick another starting point. If all starting points fail, then quit and print an error message.
5. When testing, the more words that need to go into the grid, the larger the grid should be in order to not get a failure. Also, ordering the words in the file in <i>reverse</i> order of length helps fit more words into the grid - the longer (and harder to fit) words come first when there is more room available in the grid.

## Hints

1. If you don't know how to do something in Javascript, Google it; I do it all the time.
2. Then post a question to Piazza. That usually provides an answer.
3. I've given you a few things in the startup file to get you going.
4. The arrays deltaRow and deltaColumn are used when placing the letters in a word in one of the 8 different directions (and also when testing if a word can be placed). Can you figure out how to use them?
5. Always use <b>let</b> or <b>const</b> when declaring a variable, not <b>var</b>.
6. calendar.js has an example of how to use process.argv to pull arguments off the command line and how to convert numerical arguments to Ints. (process.argv contains all strings.)
7. And finally the most important hint. <b>Start today</b>.

## Submission

When you have written and tested the code, make sure the final version is committed to Github Classroom. (More about this in class on Monday). 
