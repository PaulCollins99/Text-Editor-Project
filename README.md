How to use

- Run NPM Start on the directory
    - The package has the prestart command of NPM install so it will install all dependences automatically 
- Go to relevant address and it will load into the splash screen
- On first run, click new file and this will take you into the editor
- The hotkeys can be found in both the splash screen and in the editor
- The buttons found in the top left hand corner of the screen do the same things as the hotkeys. They are there for devices without keyboards
- To save a file under a name type a name in the text input and click save as. This will save the contents of the textarea to the local storage as    "saveFile:FileName"
- The file can now be seen in the nav bar on the left hand sied of the editor. You can open any file from this nav bar
- To delete a file, open the file in question, click the delete button and then refresh the page
- To download a file click the download file button and it will download a txt file with the name you have saved it as
- To import a file click Choose File, select the desired file and then click the import button

The Javascript for the editor is found in one file as I ran into errors seperating it. To make it easier to read I seperated each key section with ###. I have also added JS comments to each function.

Current Features

- Indent - up to 5 indentations / Outdent (Hotkeys and buttons)
- Move line up and down (Hotkeys and buttons)
- Save File to local storage
- Open files through easy to use nav bar
- Delete files (requires a refresh to update the nav bar)
- Download file as .txt
- Import a .txt file

- Highlight and drag lines up (part of textarea by default)

How saving works.

The app saves to the local storage of the web-browser. It saves a mixture of arrays that use JSON(stringify and parse). The name of the file, the content of the text area and the levels of indenting for each line are saved. When the file is opened it re construct the arrays and assigns the relevant data where its needed.

Future Features

- Add service worker to allow the user to download the app
- Add PostgreSQL database for storage
- Add in QUnit testing to allow for easy future bug testing

Problems that Occured / Known bugs

- Attempted to add QUnit test however I was unable to get these to work effectively.
- You can backspace to get rid of indentation and it wont change the indentation log.
- If you for example add an indent when the textarea has a scollbar the scrollbar will be moved to the top even if you are indenting the bottom line.

Delete before upload

- add postgres database
- add a service worker (use hsww in github folder)

