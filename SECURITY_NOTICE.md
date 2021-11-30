This software is just to easily remove credentials using regexp. I didn't want to expend more time developing the project than the time it will take me to remove the credentials using a search pattern kind of script and a notepad.

If you are going to develop a similar software for 100% secure automated workflows, you probably want to use a tokenizer and not nasty splits, regexp and matchs.

THIS PROGRAM HAS 100% BUGS 

Also even if it was 100% securite (it's not), you still have to care when you should run the program. Mostly beacuse compilers, builders, engines, etc, can create new file from the files you have with credentials. If this is the case, you will only remoce the credentials from the source files, not the generated ones.


