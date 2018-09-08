# cmddict
command line dictionary app using node js and wordnik api

## Command Line Dictionary Tool

  Command line dictionary tool using wordnik (http://wordnik.com) api and Node/Express.
  
Offers following functions with nicely formatted output.

1. Word Definitions
	* Display definitions of a word. 
	* ./dict def <word>

2. Word Synonyms
	* Display synonyms of a word. 
	* ./dict syn <word>
3. Word Antonyms
	* Display antonyms of a word
	* ./dic ant <word>

4. Word Examples
	* Display examples of a word
	* ./dict ex <word>

5. Word Full Dict
	* Display all above details for a word
	* ./dict <word> or ./dict dict <word>

7. Word Game
	* ./dict play
	* The program will display a definition, synonym, or antonym and ask the user to enter the word
  
	* If correct word is entered, program will tell that the word is correct. Synonyms of the word will be accepted as correct answer.
	* Other(not displayed) 
  
	   If incorrect word is entered, program will ask for
     
		   1. try again 
       
              Lets user enter word again
              
		   2. hint
       
			    Display a hint, and let user enter word again
         
			    Hint can be
            
                    Display the word randomly jumbled (cat -> atc)
            
                    OR Display another definition of the word
            
                    OR Display another antonym of the word
            
                    OR Display another synonym of the word
            
		   3. quit
       
			     Display the word, its full dict, and quit
