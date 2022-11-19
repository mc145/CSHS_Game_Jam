# Greed is Gory

Welcome to Greed is Gory, a new and innovating maze game, which punishes you for greed. 

#Running Code 
Either access the website by Github Pages, or simply clone the repository and run index.html in a local web server--no external libraries will need to be downloaded locally. 


#How to Play 
The game is pretty intuitive: 
You are the red orb which starts in the bottom-left corner, and you have to work your way through to the top-right corner, which is the exit. Your goal is to accumulate the maximum number of points. 

Simply making it to the exit is worth 8 points; however, throughout the maze, there are various point value tiles (which you get when you step on them). 

Some of the points are worth a positive number of points, while some are worth a negative number of points. However, if you become too greedy (which is human nature) and go to the tiles with the highest points,
one of the initially open walls will randomly close (which means you may be stuck!) However, if you're greedy and lucky (the wall which closes doesn't severely impact your route), 
you'll be able to get more points. 

Also note that there is a black cloud of smoke covering most of your path, meaning that if you get greedy and choose a boundary, one of the intersections closing may mean that the route to the end is much more difficult. 


#Steps needed to create 
As it was only made in a couple hours, it wasn't particularly difficult. The most difficult step was to actually generate the maze, which required some thinking to implement the dfs with backtracking. 
After that, all that was needed was implementing each of the features. 
