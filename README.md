(In progress)
How to use

- Run NPM Start on the directory
    - The package has the prestart command of NPM install so it will install all dependences automatically 
- Go to relevant IP and it will load into the splash screen
- On first run, click new file and this will take you into the editor
- The hotkeys can be found in both the splash screen and in the editor
- The buttons found in the top left hand corner of the screen do the same things as the hotkeys. They are there for devices without keyboards
- To save a file under a name type a name in the text input and click save as. This will save the contents of the textarea to the local storage as    "saveFile:FileName"
- The file can now be seen in the nav bar on the left hand sied of the editor. You can open any file from this nav bar
- To delete a file, open the file in question, click the delete button and then refresh the page
- To download a file simply click the download file button and it will download a txt file with the name you have saved it as

Current Features

- Indent - up to 5 indentations / Outdent (Hotkeys and buttons)
- Move line up and down (Hotkeys and buttons)
- Save File to local storage
- Open files through easy to use nav bar
- Delete files (requires a refresh to update the nav bar)
- Download file as .txt
- Import a .txt file

- Highlight and drag lines up (part of textarea by default)

How the saving works.

The app saves to the local storage of the web-browser. It saves a mixture of arrays that use JSON(stringify and parse). The name of the file, the content of the text area and the levels of indenting for each line are saved. When the file is opened it re construct the arrays and assigns the relevant data where its needed.

Future Features

- Add service worker to allow the user to download the app
- Add postgreSQL database for storage
- Add in QUnit testing to allow for easy future bug testing

Problems that Occured / Known bugs

- Attempted to add QUnit test however I was unable to get these to work effectivly.
- Indent Level is not saved so only works at the time of writing and not after a refresh


Delete before upload

- done - re write how filemanager works to include previeous version (current: previous: store arrays containing Filename, content, indentLog)
- explain how save files work (write out in the readme how the filemanager system works)
- redo how the drop down works (remove shit code from wed, make the drop down options move text in)
- add a service worker (use hsww in github folder)

fix initialLoad